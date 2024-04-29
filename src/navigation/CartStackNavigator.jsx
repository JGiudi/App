import { View, Text } from 'react-native'
import React from 'react'
import Cart from '../screens/Cart'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const CartStack = () => {
  return (
    <Stack.Navigator 
        initialRouteName ="CartScreen"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen 
            name="CartScreen" 
            component={Cart}
            screenOptions={{
                headerShow: false
            }}
        />

    </Stack.Navigator>
  )
}

export default CartStack