import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SwitchCustom = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    backgroundColor: '#007bff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  switchLabel: {
    color: 'white',
    fontSize: 18,
  },
});

export default SwitchCustom;
