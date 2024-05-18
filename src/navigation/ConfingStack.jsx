import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConfigScreen from '../screens/Config';


const ConfigStack = createStackNavigator();

// Define las pantallas para el stack de configuración
const ConfigStackNavigator = () => {
  return (
    <ConfigStack.Navigator>
      <ConfigStack.Screen
        name="Config"
        component={ConfigScreen}
        options={{ title: 'Configuración' }}
      />
    </ConfigStack.Navigator>
  );
};

export default ConfigStackNavigator;
