import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons  } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../global/theme';

type MenuItemProps = {
  flavor: string;
  action: ()=>void;
}

export function FlavorCard({flavor, action}:MenuItemProps){

  return (
    <TouchableOpacity 
      onPress={action}
      style={styles.container} 
      activeOpacity={0.6}
    >
      <MaterialIcons name="icecream" color={theme.colors.primary} size={20} />
      <Text style={styles.title}>
        {flavor}
      </Text>
    </TouchableOpacity>
  );
}