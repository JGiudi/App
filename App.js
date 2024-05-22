import { StyleSheet, SafeAreaView, View, Platform } from 'react-native';
import Navigator from "./src/navigation/Navigator"
import { Provider } from 'react-redux';
import store from './src/store';
import { dropSessionsTable, initSQLiteDB } from "./src/persistence"

(async () => {
  try {
    if (Platform.OS !== 'web') {
      const response =     await initSQLiteDB();
    }
  } catch (error) {
  }
})();

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
