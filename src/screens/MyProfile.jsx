import React from "react";
import { Image, View, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/shopService";
import { clearUser } from "../features/User/userSlice"
import { truncateSessionsTable } from "../persistence"


const MyProfile = ({ navigation }) => {
    const dispatch = useDispatch();

    const { imageCamera, localId } = useSelector((state) => state.auth.value);
    const { data: imageFromBase } = useGetProfileImageQuery(localId);

    const launchCamera = async () => {
        navigation.navigate("Image selector");
    };

    const launchLocation = async () => {
        navigation.navigate('List Address');
    };

    const signOut = async () => {
        try {
            const response = await truncateSessionsTable();
            console.log(response);
            dispatch(clearUser());
        } catch (error) {
            console.log({ errorSignOutDB: error });
        }
    };

    const defaultImageRoute = "../../assets/images/defaultProfile.png";

    return (
        <View style={styles.container}>
            {imageFromBase || imageCamera ? (
                <Image
                    source={{ uri: imageFromBase?.image || imageCamera }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <Image
                    source={require(defaultImageRoute)}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <Button
                onPress={launchCamera}
                title={
                    imageFromBase || imageCamera
                        ? "Modify profile picture"
                        : "Add profile picture"
                }
            />
            <Button onPress={launchLocation} title="My address" />
            <Button onPress={signOut} title="Sign out" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    image: {
        width: 190,
        height: 190,
        borderRadius: 100,
        marginBottom: 20,
    },
    defaultImage: {
        borderWidth: 1,
        borderColor: "blue",
    },
    button: {
        backgroundColor: "blue",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: 190
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
});

export default MyProfile;
