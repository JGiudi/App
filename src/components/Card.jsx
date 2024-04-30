import { StyleSheet, View } from 'react-native';
import React from 'react';

const Card = ({ children, style }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    elevation: 5,
    borderRadius: 12,
    margin:  7
  },
});
