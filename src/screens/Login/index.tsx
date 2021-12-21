import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { useOrders } from '../../hooks/useOrders';

const credentials = [
  {
    username: 'Venilson',
    password: '857612'
  },
  {
    username: 'Cayke',
    password: '549802'
  },
  {
    username: 'Milena',
    password: '842648'
  },
  {
    username: 'Carol',
    password: '915786'
  },
]

export function Login(){
  const { setUser } = useOrders();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  async function handleLogin() {
    if(!username || !password) return;

    const credential = credentials.find(item=>item.username===username && item.password===password);

    if(!credential?.username) return;

    try {
      await AsyncStorage.setItem('@user', credential?.username);
      setUser(credential.username);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>
        Casa da Taça
      </Text>

      <TextInput 
        value={username}
        onChangeText={setUsername}
        placeholder="Digite seu usuário..."
        placeholderTextColor="#646466"
        style={styles.input}
      />
      <TextInput 
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha..."
        placeholderTextColor="#646466"
        style={styles.input}
      />

      <RectButton
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonTitle}>
          Login
        </Text>
      </RectButton>
    </KeyboardAvoidingView>
  );
}