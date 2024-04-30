import { FlatList, Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import CartData from '../data/cart.json'
import ProductCart from '../components/ProductCart'

const Cart = () => {
  // Calcula el total sumando los precios de todos los productos en el carrito
  const total = CartData.reduce((acumulador, currentItem) => acumulador += currentItem.price * currentItem.quantity, 0)

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <ProductCart
              product={item}
            />
          )
        }}
      />
      {/* Contenedor del total y el botón de confirmar */}
      <View style={styles.totalContainer}>
        {/* Botón de confirmar */}
        <Pressable style={styles.confirmButton} onPress={() => console.log("Confirmado")}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </Pressable>
        {/* Total */}
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
