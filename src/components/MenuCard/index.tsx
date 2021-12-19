import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, Fontisto, MaterialIcons  } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../global/theme';
import { MenuProps } from '../../context/MenuContext';

type MenuItemProps = {
  item: MenuProps;
  action: ()=>void;
}

export function MenuCard({item, action}:MenuItemProps){

  return (
    <TouchableOpacity 
      onPress={action}
      style={styles.container} 
      activeOpacity={0.6}
    >
      {
        item.type==='cup'?
        <FontAwesome5 name="wine-glass" color={theme.colors.primary} size={20} />:
        item.type==='ship'?
        <Fontisto name="ship" color={theme.colors.primary} size={20} />:
        <MaterialIcons name="local-drink" color={theme.colors.primary} size={20} />
      }
      <Text style={styles.title}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}