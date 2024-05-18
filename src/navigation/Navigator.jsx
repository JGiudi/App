import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import BottomTabNavigator from './BottomTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import Config from '../screens/Config' 
import { getSession } from '../persistence/index'
import { setUser } from '../features/User/userSlice'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth.value)

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession()
        if (response.rows._array.length) {
          const user = response.rows._array[0]
          dispatch(setUser({
            email: user.email,
            localId: user.localId,
            idToken: user.token
          }))
        }
      } catch (error) {

      }
    })()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen 
            name="BottomTab" component={BottomTabNavigator} options={{ headerShown: false }} />

            <Stack.Screen 
            name="Config" component={Config} />
          </>
        ) : (
          <Stack.Screen 
            name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})
