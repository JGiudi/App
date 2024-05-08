import React, { useState } from "react";
import { Image, View, StyleSheet, Text, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/userSlice";
import { useGetProfileImageQuery } from "../services/shopService";

const MyProfile = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const { imageCamera, localId } = useSelector((state) => state.auth.value);
    const {data: imageFromBase} = useGetProfileImageQuery(localId)
    const dispatch = useDispatch();

    const launchCamera = async () => {
        navigation.navigate('Image selector');
    };

    const defaultImageRoute = "../../assets/images/defaultProfile.png";

    return (
        <View style={styles.container}>
            {imageFromBase || imageCamera  ? (
                <Image
                    source={{uri: imageFromBase?.image || imageCamera}}
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
            {!image && !imageCamera && (
                <Button
                    title="Tomar foto"
                    onPress={launchCamera}
                    color={"blue"}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    defaultImage: {
        borderWidth: 1,
        borderColor: "blue"
    },
});

export default MyProfile;
