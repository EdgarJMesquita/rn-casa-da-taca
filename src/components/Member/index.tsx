import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../global/theme';
import { MemberProps } from '../../context/OrderContext';

type MemberProps1 = {
  name: string;
  action: ()=>void;
  member: MemberProps;
}

export function Member({member, action}:MemberProps1){

  const noPaidOrders = member?.orders?.length? 
    member.orders.filter(item=>item.status!=='paid')
    .map(item=>parseFloat(item.price))
    :[];

  const subTotal = noPaidOrders?.length? 
    noPaidOrders?.reduce((previous,current)=>previous+current)
    :null;

  return (
    <TouchableOpacity 
      onPress={action}
      style={styles.container} 
      activeOpacity={0.6}
    >
      <FontAwesome name="user" color={theme.colors.primary} size={20}/>
      <Text style={styles.title}>
        {member.name}
      </Text>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={styles.title}>
          R$ {subTotal?.toFixed(2) || '0.00'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}