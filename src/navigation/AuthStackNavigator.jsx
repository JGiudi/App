import { View, Text } from 'react-native'
import React from 'react'
import Signup from '../screens/Signup'
import Login from '../screens/Login'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator 
        initialRouteName ="Login"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen 
            name="Login" 
            component={Login}
            screenOptions={{
                headerShow: false
            }}
        />

        <Stack.Screen 
            name="Sign up" 
            component={Signup}
            screenOptions={{
                headerShow: false
            }}
        />

    </Stack.Navigator>
  )
}

export default AuthStackNavigator