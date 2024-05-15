import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useGetProductByIdQuery } from "../services/shopService";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/Cart/cartSlice";

const ItemDetail = ({ route, navigation }) => {
  const { productId: idSelected } = route.params;
  const { data: product } = useGetProductByIdQuery(idSelected);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddCart = () => {
    dispatch(addCartItem({ ...product, quantity }));
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images[0] }} resizeMode="cover" style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.quantityContainer}>
          <Text style={styles.button} onPress={decrementQuantity}>-</Text>
          <Text style={styles.quantity}>{quantity}</Text>
          <Text style={styles.button} onPress={incrementQuantity}>+</Text>
        </View>
        <Button title="Add to Cart" onPress={handleAddCart} color="#007BFF" />
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    fontSize: 24,
    color: "#007BFF",
    paddingHorizontal: 10,
  },
});

export default ItemDetail;
