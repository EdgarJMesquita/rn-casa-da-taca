import React from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { styles } from './styles';
import { useOrders } from '../../hooks/useOrders';

type CustomDrawerContentCOmponenteProps = DrawerContentComponentProps & {
  email?: string|null;
}

export function CustomDrawer({email, ...props}:CustomDrawerContentCOmponenteProps){

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.userInitials}>
          MI
        </Text>
      </View>
      <Text style={styles.username}>
        {email}
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>
    </View>
  );
}