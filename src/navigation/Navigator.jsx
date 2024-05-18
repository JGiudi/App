import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { getSession } from '../persistence/index';
import { setUser } from '../features/User/userSlice';

const Drawer = createDrawerNavigator();

const Navigator = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth.value);

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const response = await getSession();
        if (response.rows._array.length) {
          const user = response.rows._array[0];
          dispatch(setUser({
            email: user.email,
            localId: user.localId,
            idToken: user.token
          }));
        }
      } catch (error) {
        console.error('Error getting user session:', error);
      }
    };
    
    getUserSession();
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={BottomTabNavigator} />
        </Drawer.Navigator>
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
