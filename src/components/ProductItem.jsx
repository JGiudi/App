import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'

const ProductItem = ({product}) => {
  return (
    <Card
      style={styles.additionalStylesCard}
    >
    <Image 
          resizeMode='cover'
          style = {styles.image}
          source={{uri: product.images[0]}}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textCategory}>{product.title}</Text>
        <Text style={styles.textPrice}>${product.price}</Text>
      </View>

        
        
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "35%"
  },
  additionalStylesCard: {
    flexDirection: 'row',
    height: 135,
    width: "94%",
    justifyContent: 'space-between',
    margin: 10,
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