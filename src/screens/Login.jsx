import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from "react-redux"
import { useSignInMutation } from '../services/authService';
import { setUser } from '../features/User/userSlice';
import { insertSession } from '../persistence/index';

const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const [triggerSignIn, result] = useSignInMutation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (result?.data && result.isSuccess) {
      insertSession({
          email: result.data.email,
          localId: result.data.localId,
          token: result.data.idToken,
      })
          .then((response) => {
              dispatch(
                  setUser({
                      email: result.data.email,
                      idToken: result.data.idToken,
                      localId: result.data.localId,
                  })
              )
          })
          .catch((err) => {
              console.log(err)
          })
    }
}, [result])
  
  
  const onSubmit = () => {
    // Validar datos de entrada
    if (!email || !password) {
      setError("Por favor ingresa un correo electrónico y una contraseña.")
      return
    }
    setLoading(true)
    setError("")
    triggerSignIn({ email, password })
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
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity onPress={handleSignUpRedirect}>
        <Text style={styles.signupText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Iniciar sesión</Text>}
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
