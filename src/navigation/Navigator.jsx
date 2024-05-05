import { StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import BottomTabNavigatior from '../navigation/BottomTabNavigatior'
import AuthStackNavigator from './AuthStackNavigator'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  const {user} = useSelector(state => state.auth.value)
  return (
    <NavigationContainer>
      {user ? <BottomTabNavigatior/> : <AuthStackNavigator/>}

      {/* <Stack.Navigator>
        <Stack.Screen 
          name="BottomTab" 
          component={BottomTabNavigatior} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator> */}
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})
