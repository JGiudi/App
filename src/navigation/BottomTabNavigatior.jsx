import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign  } from "@expo/vector-icons"
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeStackNavigator from './HomeStackNavigator'
import SettingsStackNavigator from './SettingsStackNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import CartStack from './CartStackNavigator'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                             <AntDesign 
                                name="home" 
                                size={30} 
                                color={focused ? "black" : "gray"}
                             />
                        </View>
                    ),
                    headerShown: false,
                }}
                
            />
            <Tab.Screen 
                name="Cart"
                component={CartStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                             <AntDesign 
                                name="shoppingcart" 
                                size={30} 
                                color={focused ? "black" : "gray"}
                             />
                        </View>
                    ),
                }}
            />
            <Tab.Screen 
                name="Auth" 
                component={AuthStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                             <AntDesign 
                                name="user" 
                                size={30} 
                                color={focused ? "black" : "gray"}
                             />
                        </View>
                    ),
                }}
            />
            <Tab.Screen 
                name="Config" 
                component={SettingsStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                             <AntDesign 
                                name="setting" 
                                size={30} 
                                color={focused ? "black" : "gray"}
                             />
                        </View>
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTabNavigator
