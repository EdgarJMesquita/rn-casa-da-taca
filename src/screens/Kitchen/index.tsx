import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { OrderCard } from '../../components/OrderCard';
import { useOrders } from '../../hooks/useOrders';
import { StackScreensProps } from '../../routes/types';

export function Kitchen({ route, navigation }:StackScreensProps){
  const { tables } = useOrders();

  async function handleDeleteOrder(orderId:string){

  }

  return (
    <Background>
      <ScrollView style={{flex: 1, width: '100%'}}>
        {
          tables?.map((table, index)=>(
            table?.members?.length!==0 &&
              <View key={index}>
                <View style={styles.tableLabel}>
                  <Text style={styles.title}>
                    Mesa {table?.name}
                  </Text>
                </View>
                <View style={styles.container}>
                  <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    {
                      table?.members?.map((member, index)=>(
                        <View key={index}>
                          {
                            member.orders.length>0 &&
                            <Text style={styles.subtitle}>
                              {member.name}
                            </Text>
                          }
                          {
                            member.orders.map((order, index)=>{
                              if(order.type==='drink')return null;
                              return(
                                <OrderCard
                                  order={order}
                                  key={index}
                                  deleteOrder={()=>handleDeleteOrder(order.id)}
                                />
                              )
                            })
                          }
                        </View>
                      ))
                    }
                  </View>
                </View>
              </View>
          ))
        }
      </ScrollView>
    </Background>
  );
}