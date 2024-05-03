import { StyleSheet, SafeAreaView, View } from 'react-native';
import Navigator from "./src/navigation/Navigator"
import Home from './src/screens/Home'
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigator/>
      </Provider>
      
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
