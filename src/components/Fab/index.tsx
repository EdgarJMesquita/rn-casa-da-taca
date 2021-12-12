import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { styles } from './styles';

export function Fab(){
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.fab}>
        <Entypo name="plus" size={30} color={theme.colors.text}/>
      </View>
    </TouchableOpacity>
  );
}