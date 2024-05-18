import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ItemDetail from '../screens/ItemDetail';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Home'
        component={Home}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name='Detail' 
        component={ItemDetail}
        options={{ 
          headerShown: true,
          title: 'Detalles del Artículo'
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
