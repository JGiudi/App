import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ProductItem from "../components/ProductItem";
import HeaderHome from "../components/HeaderHome";
import { useGetAllProductsQuery } from "../services/shopService";

const Home = ({ navigation }) => {
  const {data: products, error} = useGetAllProductsQuery()

  if (error) {
    return <Text>Error al cargar los datos</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderHome/>
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
    paddingTop: 20,
  },
});

export default Home;
