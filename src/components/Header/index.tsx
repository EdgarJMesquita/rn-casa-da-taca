import React from 'react';
import { View, Image } from 'react-native';
import { Entypo  } from '@expo/vector-icons';
import Logo from '../../assets/logo.png';
import { styles } from './styles';

export function Header(){
  return (
    <View style={styles.container}>
      <Entypo name="menu" size={30} color="#FFFFFF"/>
      <Image source={Logo} style={{marginTop: 2, marginRight: 10}}/>
      <View></View>
    </View>
  );
}