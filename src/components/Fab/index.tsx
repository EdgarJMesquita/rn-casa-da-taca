import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { styles } from './styles';

type FabProps = TouchableOpacityProps & {
  icon: ReactNode;
}

export function Fab({icon, ...props}:FabProps){
  return (
    <TouchableOpacity
      {...props}
      style={styles.button}
    >
      <View style={styles.fab}>
        {icon}
      </View>
    </TouchableOpacity>
  );
}