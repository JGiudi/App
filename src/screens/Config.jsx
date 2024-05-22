import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SwitchCustom from '../components/SwitchCustom';

const Config = ({ toggleDarkMode, toggleLightMode }) => {
  return (
    <View style={styles.container}>
      <Text> No son funcionales pero quería hacer un menu hamburguesa</Text>
      <SwitchCustom 
      label="Tema Oscuro" onPress={toggleDarkMode} />
      <SwitchCustom 
      label="Tema Claro" onPress={toggleLightMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Config;
