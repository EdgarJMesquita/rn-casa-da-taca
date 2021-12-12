import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { theme } from './src/global/theme';
import { Routes } from './src/routes';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ubuntu_400Regular, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Background } from './src/components/Background';

export default function App() {
  let [ isFontsReady ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Ubuntu_400Regular,
    Ubuntu_500Medium
  })

  if(!isFontsReady){
    return(
      <AppLoading />
    );
  }

  return (
    <Background>
      <StatusBar style="light" backgroundColor={theme.colors.black100} translucent/>
      <Routes />
    </Background>
  );
}