import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'

const ProductItem = ({
  product,   
  navigation
}) => {
  return (
    <Pressable onPress={() => navigation.navigate('Detail', { productId: product.id })}>
      <Card>
      <View style={styles.container}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textCategory}>{product.title}</Text>
          <Text style={styles.textPrice}>${product.price}</Text>
        </View>
      </View>
      </Card>
    </Pressable>
  )
}

export default ProductItem



const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 135,
  },
  image: {
    height: "100%",
    width: "35%",
    borderRadius: 5
  },
  textContainer: {
    flex: 1,
  },
  textCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,

  },
    textCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 65,
  },
  textPrice: {
    fontSize: 16,
    color: 'gray',
  }
})