import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import ItemDetail from '../screens/ItemDetail'

const Stack = createNativeStackNavigator()

const Navigator = () => {
    return (
          <Stack.Navigator>
            <Stack.Screen 
              name='Home'
              component={Home} 
            />
            <Stack.Screen 
              name='Detail' 
              component={ItemDetail}
            />
          </Stack.Navigator>
    )
  }
  
  export default Navigator
  
  const styles = StyleSheet.create({})