import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import products from '../data/products.json';
import ProductItem from "../components/ProductItem";
import HeaderHome from "../components/HeaderHome";

const ItemListCategory = () => {
  return (
    <View style={styles.container}>
      <HeaderHome/>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});

export default ItemListCategory;