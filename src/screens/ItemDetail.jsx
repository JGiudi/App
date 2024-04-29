import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import allProducts from "../data/products.json";

const ItemDetail = ({ route, navigation }) => {
  const { productId: idSelected } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Buscar el producto correspondiente al ID seleccionado
    const productSelected = allProducts.find((product) => product.id === idSelected);
    setProduct(productSelected);
  }, [idSelected]);

  // Verificar si el producto está cargando
  if (!product) {
    return <Text>Loading...</Text>; // Mostrar un indicador de carga si el producto está null
  }

  // Renderizar la vista del producto
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images[0] }} resizeMode="cover" style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Button title="Add to Cart" onPress={() => {/* Acción al presionar el botón */}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default ItemDetail;
