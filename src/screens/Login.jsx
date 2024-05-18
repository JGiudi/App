import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper'; // Renombrar esta importación
import { useDispatch } from "react-redux";
import { useSignInMutation } from '../services/authService';
import { setUser } from '../features/User/userSlice';
import { insertSession } from '../persistence/index';

const image = require("../../assets/images/fondo.jpg");

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerSignIn, result] = useSignInMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (result?.error) {
      setLoading(false);
      setError("Hubo un error al iniciar sesión. Por favor, verifica tus credenciales.");
    } else if (result?.data && result.isSuccess) {
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
        );
        ({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        });
      })
      .catch((err) => {

      });
    }
  }, [result]);
  
  const onSubmit = () => {
    if (!email || !password) {
      setError("Por favor ingresa un correo electrónico y una contraseña.");
      return;
    }
    setLoading(true);
    setError("");
    triggerSignIn({ email, password });
  };

  const handleSignUpRedirect = () => {
    navigation.navigate('Sign up');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Login</Text>
          <PaperTextInput
            style={[styles.input, {backgroundColor: 'rgba(255, 255, 255, 0.6)'}]}
            placeholder="Correo electrónico"
            placeholderTextColor="black"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            label="Correo electrónico"
            theme={{ colors: { text: 'black', primary: 'black', placeholder: 'black' } }}
            inputStyle={{ color: 'white' }}
          />
          <PaperTextInput
            style={[styles.input, {backgroundColor: 'rgba(255, 255, 255, 0.6)'}]}
            placeholder="Contraseña"
            placeholderTextColor="black"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            label="Contraseña"
            theme={{ colors: { text: 'black', primary: 'black', placeholder: 'black' } }}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity onPress={handleSignUpRedirect}>
            <Text style={styles.signupText}>¿No tienes cuenta? Regístrate aquí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={onSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Iniciar sesión</Text>}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  signupText: {
    marginTop: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#460051',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
