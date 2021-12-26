import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useOrders } from '../../hooks/useOrders';
import { styles } from './styles';
import { theme } from '../../global/theme';

const auth = getAuth();

export type User = {
  uid: string|null;
  displayName: string|null;
  email: string|null;
  avatar: string|null;
}

export function Login(){
  const { setUser } = useOrders();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setLoading ] = useState(false);
  
  async function handleLogin() {
    if(!email || !password) return;

    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if(!user) return;

      const _user = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        avatar: user.photoURL
      }
      await AsyncStorage.setItem('@uid', JSON.stringify(_user));

      setUser(_user);

    } catch (error) {
      console.log(error);
      alert(error);
      
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const _user = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          avatar: user.photoURL
        }
        setUser(_user);
      }
    });
  },[]);


  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>
        Casa da Taça
      </Text>

      <TextInput 
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu usuário..."
        placeholderTextColor="#646466"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput 
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha..."
        placeholderTextColor="#646466"
        style={styles.input}
        keyboardType="default"
        secureTextEntry={true}
      />

      <RectButton
        style={styles.button}
        onPress={handleLogin}
      >
        {
          !isLoading?
          <Text style={styles.buttonTitle}>
            Login
          </Text>
          :
          <ActivityIndicator size={20} color={theme.colors.text}/>
        }
      </RectButton>
    </KeyboardAvoidingView>
  );
}