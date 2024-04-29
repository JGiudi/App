import { StyleSheet, SafeAreaView, View } from 'react-native';
import Navigator from "./src/navigation/Navigator"
import Home from './src/screens/Home'
import { useState } from 'react';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator/>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
