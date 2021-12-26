import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { theme } from './src/global/theme';
import { Routes } from './src/routes';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ubuntu_400Regular, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Background } from './src/components/Background';
import { MenuContextProvider } from './src/context/MenuContext';
import { OrdersContextProvider } from './src/context/OrderContext';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.getExpoPushTokenAsync({experienceId: '@xongas/casadataca'}).then(res=>console.log(res));

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  let [ isFontsReady ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Ubuntu_400Regular,
    Ubuntu_500Medium
  })
  
  const showAlert = () => {
    Alert.alert(
      "NOVA ATUALIZAÇÃO DISPONÍVEL",
      "É necessário reiniciar o aplicativo",
      [
        {
          text: "Atualizar",
          onPress: () => Updates.reloadAsync(),
          style: "default",
        },
      ],
      {
        cancelable: false,
      }
    );
  }
      
  useEffect(()=>{
    if(__DEV__) return console.log('Updates ignorado por estar em desenvolvimento.');
    async function handleUpdate() {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          showAlert();
        }
      } catch (e) {
        console.log(e);
      }
    }
    handleUpdate();
  }, []);

  
  if(!isFontsReady){
    return(
      <AppLoading />
    );
  }

  return (
    <Background>
      <OrdersContextProvider>
        <MenuContextProvider>
          <StatusBar style="light" backgroundColor={theme.colors.black100} translucent/>
          <Routes />
        </MenuContextProvider>
      </OrdersContextProvider>
    </Background>
  );
}