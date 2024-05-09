import { StyleSheet, SafeAreaView, View } from 'react-native';
import Navigator from "./src/navigation/Navigator"
import { Provider } from 'react-redux';
import store from './src/store';
import { dropSessionsTable, initSQLiteDB } from "./src/persistence"

(async ()=> {
  try {
      const response = await initSQLiteDB()
      console.log({responseCreatingDB: response});
      console.log("DB initialized");
  } catch (error) {
      console.log({errorCreatingDB: error});
  }
})()

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
