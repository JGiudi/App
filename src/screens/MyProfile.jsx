import { Image, StyleSheet, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery, usePostProfileImageMutation } from "../services/shopService";
import { clearUser } from "../features/User/userSlice";
import { truncateSessionsTable } from "../persistence";

const MyProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { imageCamera, localId } = useSelector((state) => state.auth.value);
    const { data: imageFromBase, refetch } = useGetProfileImageQuery(localId, { skip: !localId });
    const [postProfileImage] = usePostProfileImageMutation();
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (localId) {
            refetch();
        }
    }, [localId, refetch]);

    useEffect(() => {
        if (imageFromBase?.image) {
            setProfileImage(imageFromBase.image);
        } else if (imageCamera) {
            setProfileImage(imageCamera);
        } else {
            setProfileImage(null);
        }
    }, [imageFromBase, imageCamera]);

    const launchCamera = async () => {
        navigation.navigate("Image selector");
        // Simular el guardado de la imagen y luego refetch
        setTimeout(() => {
            refetch();
        }, 1000); // Ajusta el tiempo según sea necesario
    };

    const saveImage = async (image) => {
        if (localId) {
            await postProfileImage({ image, localId });
            refetch();
        } else {
            console.error("No se puede guardar la imagen: localId es undefined.");
        }
    };

    const launchLocation = async () => {
        navigation.navigate("List Address");
    };

    const signOut = async () => {
        try {
            await truncateSessionsTable();
            dispatch(clearUser());
            setProfileImage(null); // Resetea la imagen a null en el sign out
        } catch (error) {
            console.error(error);
        }
    };

    const defaultImageRoute = "../../assets/images/defaultProfile.png";

    return (
        <View style={styles.container}>
            <Image
                source={profileImage ? { uri: profileImage } : require(defaultImageRoute)}
                style={styles.image}
                resizeMode="cover"
            />
            <Button
                onPress={launchCamera}
                title={profileImage ? "Cambiar la foto de perfil" : "Agregar foto de perfil"}
            />
            <Button onPress={launchLocation} title="Mi dirección" />
            <Button onPress={signOut} title="Cerrar sesión" />
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
