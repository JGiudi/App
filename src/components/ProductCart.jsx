import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../features/Counter/countSlice';
import { removeCartItem } from "../features/Cart/cartSlice"

const ProductItem = ({ product, navigation }) => {
  const dispatch = useDispatch()
  const [inputToAdd, setInputToAdd] = useState(null);

  const handleRemove = () => {
    dispatch(removeCartItem({ id: product.id }))
  }
  // const handleIncrement = () =>{
  //   dispatch(increment({id: product.id}))
  // }
  // const handleDecrement = () =>{
  //   dispatch(decrement({id: product.id}))
  // }

  return (
    <Pressable onPress={() => navigation.navigate('Detail', { productId: product.id })}>
      <Card>
        <View style={styles.container}>
          <Image
            source={{ uri: product.images[0] }}
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textCategory}>{product.title}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={handleRemove}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </Pressable>
              <Text style={styles.textPrice}>${product.price}</Text>
            </View>
            <View style={styles.bottomContainer}>
              {/* <Pressable
                style={styles.button}
                onPress={handleIncrement}>
                <Text style={styles.buttonText}>+</Text>
              </Pressable> */}
              <Text style={styles.quantityText}> Cantidad: {product.quantity}</Text> 
              {/* <Pressable
                style={styles.button}
                onPress={handleDecrement}> 
                <Text style={styles.buttonText}>-</Text>
              </Pressable> */}
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  )
}

export default ProductItem


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 135,
  },
  image: {
    height: "100%",
    width: "35%",
    borderRadius: 5,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  textCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    top: 10
  },
  textPrice: {
    fontSize: 16,
    color: 'gray',
    top: "54%"
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 20,
    bottom: 5,
    color: "grey"
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: "30%",
    marginLeft: 'auto',
    right: "5%",
    bottom: 14,

  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: "center",
    fontSize: 11
  },
})
