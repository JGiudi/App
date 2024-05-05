import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from "react-redux"
import { useLoginMutation } from '../services/authService';
import { setUser } from '../features/User/userSlice';

const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const [triggerLogin, result] = useLoginMutation()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  
  useEffect(()=>{
    if(result.isSuccess){
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken
        })
      );
    }
  }, [result])

  const onSubmit = () => {
    triggerLogin({email, password})
  }

  const handleSignUpRedirect = () => {
    navigation.navigate('Sign up');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUpRedirect}>
        <Text style={styles.signupText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  signupText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Login;
