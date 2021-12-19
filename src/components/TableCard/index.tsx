import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../global/theme';
import { TableProps } from '../../context/OrderContext';

type MenuItemProps = {
  table: TableProps;
  action: ()=>void;
}

export function TableCard({table, action}:MenuItemProps){
  return (
    <TouchableOpacity 
      onPress={action}
      style={styles.container} 
      activeOpacity={0.6}
    >
      <MaterialCommunityIcons name="table-furniture" color={theme.colors.primary} size={30} />
      <Text style={styles.title}>
        {table.name}
      </Text>
    </TouchableOpacity>
  );
}