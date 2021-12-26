import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../global/theme';
import { OrderProps, TableProps } from '../../context/OrderContext';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useOrders } from '../../hooks/useOrders';

type MenuItemProps = {
  table: TableProps;
  action: ()=>void;
}

export function TableCard({table, action}:MenuItemProps){
  const [ subtotal, setSubtotal ] = useState<number>(0);
  const { closeTable } = useOrders();

  useEffect(()=>{
    const orders:OrderProps[]= [];
    table.members?.forEach(member=>{
      member.orders?.forEach(order=>{
        if(order.status!=='paid'){
          orders.push(order);
        }
      })
    })
    const _subtotal = orders.reduce((a,b)=>a+parseFloat(b.price), 0);
    setSubtotal(_subtotal);
  },[]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={action}
        style={styles.button} 
        activeOpacity={0.6}
      >
        <MaterialCommunityIcons name="table-furniture" color={theme.colors.primary} size={30} />
        <Text style={styles.title}>
          {table.name}
        </Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          {
            !!subtotal && (
              <Text style={styles.title}>
                R$ {subtotal.toFixed(2)}
              </Text>
            )
          }
        </View>
      </TouchableOpacity>
      {
        !subtotal &&
        <BorderlessButton
          onPress={()=>closeTable(table.id)}
          style={{height: 50, marginRight: 15, justifyContent: 'center', alignItems: 'center'}}
        >
          <AntDesign 
            name="close"
            size={20}
            color={theme.colors.primary}
          />
        </BorderlessButton>
      }
    </View>
  );
}