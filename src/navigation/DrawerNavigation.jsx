import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Config from '../screens/Config';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Config">
      <Drawer.Screen name="Config" component={Config} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
