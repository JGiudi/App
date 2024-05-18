// En tu componente Home.js

import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import { useGetAllProductsQuery } from "../services/shopService";

const Home = ({ navigation }) => {
  const { data: products, error } = useGetAllProductsQuery();

  if (error) {
    return <Text>Error al cargar los datos</Text>;
  }

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <Header openDrawer={openDrawer} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} navigation={navigation} />}
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
    paddingTop: 70,
  },
});

export default Home;
