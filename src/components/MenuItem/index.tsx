import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../global/theme';

type MenuItemProps = {
  name: string;
  action: ()=>void;
}

export function MenuItem({name, action}:MenuItemProps){
  return (
    <TouchableOpacity 
      onPress={action}
      style={styles.container} 
      activeOpacity={0.6}
    >
      <FontAwesome5 name="wine-glass" color={theme.colors.primary} size={20} />
      <Text style={styles.title}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}