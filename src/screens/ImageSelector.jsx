import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ExpoLibrary from "expo-media-library";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/userSlice";
import { useGetProfileImageQuery, usePostProfileImageMutation } from "../services/shopService";

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [isImageFromCamera, setIsImageFromCamera] = useState(false)
    const [imageURI, setImageURI] = useState("")

    const { localId } = useSelector((state) => state.auth.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)


    const [triggerPostImage, result] = usePostProfileImageMutation()

    const dispatch = useDispatch()

    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        return granted
    }

    const verifyGalleryPermissions = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        return granted
    }

    const pickLibraryImage = async () => {
        try {
            setIsImageFromCamera(false)
            const permissionGallery = await verifyGalleryPermissions()
            if (permissionGallery) {
                const result = await ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    allowsEditing: true,
                    aspect: [1,1],
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.2,
                })

                if (!result.canceled){
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }
        } catch (error) {
        }
    }


    const pickImage = async () => {
        setIsImageFromCamera(true)

        try {
            const permissionCamera = await verifyCameraPermissions()
            
            if (permissionCamera) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.2    
                })

                if (!result.canceled){
                    setImageURI(result.assets[0].uri)
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }
            
        } catch (error) {
        }

    };
    
    const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image))
            triggerPostImage({image, localId})
            if (isImageFromCamera) {
                const result = await ExpoLibrary.createAssetAsync(imageURI)
            }
            navigation.goBack()
        } catch (error) {
        }
    };
    

    useEffect(() => {
        const createAssetAsync = async () => {
            if (isImageFromCamera) {
                const result = await ExpoLibrary.createAssetAsync(imageURI);
            }
        };
    
        createAssetAsync();
    }, [isImageFromCamera]);

    return (
        <View style={styles.container}>
            {image || imageFromBase ? (
                <>
                    <Image source={{ uri: image || imageFromBase?.image }} style={styles.image} />
                    <Button title="Tomar otra foto" onPress={pickImage} />
                    <Button title="Galería" onPress={pickLibraryImage} />
                    <Button title="Confirmar foto" onPress={confirmImage} />
                </>
            ) : (
                <>
                    <View style={styles.noPhotoContainer}>
                        <Text>No hay foto para mostrar...</Text>
                    </View>
                    <Button title="Tomar una foto" onPress={pickImage} />
                </>
            )}
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    noPhotoContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: "platinum",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});