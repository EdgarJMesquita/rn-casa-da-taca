import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useOrders } from '../../hooks/useOrders';
import { styles } from './styles';
import { theme } from '../../global/theme';
import { registerForPushNotificationsAsync, uploadMobileKey } from '../../utils/notification';

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

      //setUser(_user);

      /* const token = await registerForPushNotificationsAsync();
      if(!token) return console.log('Missing token.');
      const role = user?.uid==='WlbQiG4RCSeKrNkqSpMvhZWlByE2' || user?.uid==='4s2VROZeAdd5HlJFj18imS4i7hh2'? 'admin':'attendant';
      const key = await uploadMobileKey(token, role);
      if(!key) return;
      await AsyncStorage.setItem('@TOKEN_ID', key);
      console.log('login'); */

    } catch (error) {
      alert('Email ou Senha inválidos.');
      setLoading(false); 
      //console.log(String(error).includes('wrong-password'));
      //if(String(error).includes('wrong-password')) 
      //console.log(String(error).includes('user-not-found'));
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const _user = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          avatar: user.photoURL
        }
        
        try {
          const tokenId = await AsyncStorage.getItem('@TOKEN_ID');
          if(!tokenId){
            const token = await registerForPushNotificationsAsync();
            if(token){
              const role = user?.uid==='WlbQiG4RCSeKrNkqSpMvhZWlByE2' || user?.uid==='4s2VROZeAdd5HlJFj18imS4i7hh2'? 'admin':'attendant';
              const key = await uploadMobileKey(token, role);
              if(key){
                await AsyncStorage.setItem('@TOKEN_ID', key);
              }
            }
          }
        } catch (error) {
          console.log(error);  
        }
        
        setLoading(false);
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