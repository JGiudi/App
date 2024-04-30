import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'

const ProductItem = ({ product, navigation }) => {
    const handleDelete = () => {
        // Aquí puedes implementar la lógica para eliminar el producto
        console.log('Producto eliminado:', product.title);
    };
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
            <Pressable style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </Pressable>
              <Text style={styles.textPrice}>${product.price}</Text>
            </View>
            <View style={styles.bottomContainer}>


              <Pressable style={styles.button} onPress={() => console.log("+1")}>
                <Text style={styles.buttonText}>+</Text>
              </Pressable>


              <Text style={styles.quantityText}>{product.quantity}</Text>


              <Pressable style={styles.button} onPress={() => console.log("-1")}>
                <Text style={styles.buttonText}>-</Text>
              </Pressable>
    
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
      paddingHorizontal: 10,
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
      fontSize: 18,
      fontWeight: 'bold',
      top: 10
    },
    textPrice: {
      fontSize: 16,
      color: 'gray',
      top:"54%"
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
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
    },
    deleteButton: {
      backgroundColor: 'red',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      width:"31%",
      marginLeft: 'auto',
      bottom:16
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
},
  })

