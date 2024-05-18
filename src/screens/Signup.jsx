// Signup.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/User/userSlice';
import { signupSchema } from '../validations/authSchema';
import { ProgressBar } from 'react-native-paper';
import { getProgress, getColor } from '../utils/passwordStrength'; 

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  const dispatch = useDispatch();
  const [triggerSignUp, result] = useSignUpMutation();

  useEffect(() => {
    if(result.isSuccess){
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken
        })
      );
    }
  }, [result, dispatch]);

  const onSubmit = () => {
    try {
        setErrorMail("");
        setErrorPassword("");
        setErrorConfirmPassword("");
        signupSchema.validateSync({email, password, confirmPassword});
        triggerSignUp({email, password, returnSecureToken: true});
    } catch (err) {
        switch (err.path) {
          case "email":
            setErrorMail("email invalido");
            break;
          case "password":
            setErrorPassword("la contraseña debe ser mayor a 8 caracteres");
            break;
          case "confirmPassword":
            setErrorConfirmPassword("Las contraseñas no coinciden");
            break;
        }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={[styles.input, styles.emailinput, errorMail && styles.errorInput]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errorMail ? <Text style={styles.errorMessage}>{errorMail}</Text> : null}
      <TextInput
        style={[styles.input, errorPassword && styles.errorInput]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.progressBarContainer}>
        <ProgressBar progress={getProgress(password)} color={getColor(password)} style={styles.progressBar} />
      </View>
      {errorPassword ? <Text style={styles.errorMessage}>{errorPassword}</Text> : null}
      <TextInput
        style={[styles.input, styles.lastInput, errorConfirmPassword && styles.errorInput]}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errorConfirmPassword ? <Text style={styles.errorMessage}>{errorConfirmPassword}</Text> : null}
      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text style={styles.loginText}>¿Tienes cuenta? Inicia sesión aquí</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
  emailinput:{
    bottom: 6,
  },
  lastInput: {
    bottom: 10
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 5,
  },
  progressBarContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBar: {
    height: 5, 
  },
});

export default Signup;
