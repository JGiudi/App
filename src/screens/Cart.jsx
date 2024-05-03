import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductCart from '../components/ProductCart'
import { removeCartItem } from '../features/Cart/cartSlice'
import { usePostOrderMutation } from '../services/shopService'

const Cart = () => {
  const { items } = useSelector(state => state.cart.value)

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductCart product={item} />}
      />
      <View style={styles.totalContainer}>
        <Pressable style={styles.confirmButton} onPress={() => console.log("Confirmado")}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </Pressable>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
