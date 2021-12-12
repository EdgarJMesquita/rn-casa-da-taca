import React from 'react';
import { View, Image } from 'react-native';
import { Entypo  } from '@expo/vector-icons';
import Logo from '../../assets/logo.png';
import { styles } from './styles';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { BorderlessButton } from 'react-native-gesture-handler';

export function Header({navigation}: DrawerHeaderProps){
  function handleDrawer(){
    navigation.toggleDrawer()
  }

  return (
    <View style={styles.container}>
      <BorderlessButton style={{width: 40, height: 40, justifyContent: 'center'}}>
        <Entypo onPress={handleDrawer} name="menu" size={30} color="#FFFFFF"/>
      </BorderlessButton>
      <Image source={Logo} style={{marginTop: 2, marginRight: 10}}/>
      <View></View>
    </View>
  );
}