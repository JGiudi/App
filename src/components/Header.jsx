import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Importa el hook de navegación
import MenuDropdown from "./MenuDropdown";

const Header = ({ openDrawer }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const goToConfigScreen = () => {
    navigation.navigate("Config"); // Navega a la pantalla de configuración
    closeMenu(); // Cierra el menú desplegable después de navegar
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name={isMenuOpen ? "close" : "menu"} size={30} color="black" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.text}>Bienvenido</Text>
      </View>
      {isMenuOpen && <MenuDropdown isOpen={isMenuOpen} onClose={closeMenu} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: "white",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 999,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    top:25
  },
  text: {
    color: "black",
    fontSize: 22,
  },
  menuIcon: {
    marginTop: 13,
  },
});

export default Header;
