import React from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { styles } from './styles';

export function CustomDrawer(props:DrawerContentComponentProps){
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.userInitials}>
          MI
        </Text>
      </View>
      <Text style={styles.username}>
        Milena
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>
    </View>
  );
}