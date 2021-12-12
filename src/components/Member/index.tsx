import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../global/theme';

type MemberProps = {
  name: string;
  action: ()=>void;
}

export function Member({name, action}:MemberProps){
  return (
    <TouchableOpacity 
      onPress={action}
      style={styles.container} 
      activeOpacity={0.6}
    >
      <FontAwesome name="user" color={theme.colors.primary} size={20}/>
      <Text style={styles.title}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}