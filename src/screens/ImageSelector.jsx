import React, { useState } from "react";
import { Image, View, StyleSheet, Text, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/userSlice";
import { usePostProfileImageMutation } from "../services/shopService";

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const { localId } = useSelector((state) => state.auth.value || {});
    const [triggerPostImage, result] = usePostProfileImageMutation();
    const dispatch = useDispatch();

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        return granted;
    };

    const pickImage = async () => {
        try {
            const permissionCamera = await verifyCameraPermissions();

            if (permissionCamera) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.5,
                });
                if (!result.canceled) {
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
                    setImage(image);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image));
            triggerPostImage({ image, localId });
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            {image ? (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.buttonContainer}>
                        <Button title="tomar otra foto" onPress={pickImage} style={styles.button} />
                    </View>

                    <Button title="Confirmar foto" onPress={confirmImage} style={styles.button1} />
                </>
            ) : (
                <>
                    <View style={styles.noPhotoContainer}>
                        <Text style={styles.text}>No hay foto</Text>
                    </View>
                    <Button title="Tomar foto" onPress={pickImage} />
                </>
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
    buttonContainer: {
        marginBottom: 20,
    },
    noPhotoContainer: {
        alignItems: "center",
    },
    text: {
        fontSize: 17,
        color: "gray",
        bottom: 15
    },
    button: {
        marginVertical: 5,
        color: "blue"

    },
    button1: {
        marginTop: 15,
        color: "blue"

    },
});

export default ImageSelector;
