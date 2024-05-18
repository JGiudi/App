import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const MenuDropdown = ({ isOpen, onClose }) => {
  const navigation = useNavigation();

  const goToConfigScreen = () => {
    onClose();
    navigation.navigate("Config");
  };

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  Dimensions.addEventListener('change', ({ window: { width, height } }) => {
    setWindowWidth(width);
  });

  return (
    <View style={[styles.menu, windowWidth > Dimensions.get('window').height / 2 ? styles.fullScreen : styles.halfScreen]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Icon name="close" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToConfigScreen} style={[styles.menuItem, styles.configItem]}>
        <Text style={styles.menuItemText}>Configuración</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    zIndex: 1000,
    elevation: 11,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  halfScreen: {
    backgroundColor: "white",
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height,
    left: 0,
  },
  fullScreen: {
    backgroundColor: "white",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    left: 0,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItemText: {
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 10,
  },
  configItem: {
    marginTop: 80,
  },
});

export default MenuDropdown;
