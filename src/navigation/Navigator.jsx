import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import HomeStackNavigator from '../navigation/HomeStackNavigator'
import BottomTabNavigatior from '../navigation/BottomTabNavigatior'
import { Header } from 'react-native/Libraries/NewAppScreen'
import HeaderHome from '../components/HeaderHome'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="BottomTab" 
          component={BottomTabNavigatior} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})
