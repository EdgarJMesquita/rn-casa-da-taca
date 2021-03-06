import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { OrderCard } from '../../components/OrderCard';
import { useOrders } from '../../hooks/useOrders';
import { StackScreensProps } from '../../routes/types';
import { OrderProps } from '../../context/OrderContext';

type NewOrdersProps = OrderProps & {
  table: {
    id: string;
    name: string;
  };
  member: {
    id: string;
    name: string;
  };
}

export function Kitchen({ route, navigation }:StackScreensProps){
  const { user, tables, updateOrder } = useOrders();
  const [ newOrders, setNewOrders ] = useState<NewOrdersProps[]>();

  const isAdmin =  user?.uid==='WlbQiG4RCSeKrNkqSpMvhZWlByE2' || user?.uid==='4s2VROZeAdd5HlJFj18imS4i7hh2';

  function handleFinishOrder(tableId: string, memberId: string, orderId: string){
    updateOrder(tableId, memberId, orderId, 'done');
  }

  useEffect(()=>{
    const _newOrders:NewOrdersProps[] = [];
    
    tables?.forEach(table=>{
      table.members?.forEach(member=>{
        member.orders.forEach(order=>{
          if(order.status!=='paid' && order.status!=='done' && order.type!=='drink'){
            _newOrders.push({
              ...order,
              table: {
                id: table.id,
                name: table.name
              },
              member:{
                id: member.id,
                name: member.name
              }
            });
          }
        })
      })
    });
    setNewOrders(_newOrders);
  },[tables]);

  return (
    <Background>
      <Text style={styles.title}>
        Novos Pedidos
      </Text>
      <ScrollView 
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{paddingHorizontal: 25, paddingBottom: 25}}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={100}
      >
        {
          newOrders?.length?
          newOrders?.map((order, index)=>(
            <View style={{width: '100%'}} key={index}>
              <Text style={styles.subtitle}>
                {`Mesa ${order.table.name} > ${order.member.name}`}
              </Text>
              <OrderCard
                order={order}
                isAdmin={isAdmin}
                showAction={order.status==='new' || order.status==='cancelled'}
                actionName="Finalizar"
                action={()=>handleFinishOrder(order.table.id, order.member.id, order.id)}
              />
            </View>
          ))
          : (
            <View style={{width: '100%', height: 500, justifyContent: 'center'}}>
              <Text style={styles.noMembersMessage}>
                N??o h?? pedidos
              </Text>
            </View>
          )
        }
      </ScrollView>
    </Background>
  );
}

/* 
{
          tables?.map((table, index)=>(
            table?.members?.length!==0?
              table?.members?.map((member, index)=>(
                member.orders.map((order, index)=>{
                  if(order.type==='drink' || order.status==='done' || order.status==='paid') return null;
                  return(
                    <View style={{width: '100%'}} key={index}>
                      <Text style={styles.subtitle}>
                        {`Mesa ${table.name} > ${member.name}`}
                      </Text>
                      <OrderCard
                        order={order}
                        isAdmin={isAdmin}
                        action={()=>handleFinishOrder(table.id, member.id, order.id)}
                      />
                    </View>
                  )
                })
              ))
            :(
              <View style={{width: '100%', height: 500, justifyContent: 'center'}}>
                <Text style={styles.noMembersMessage}>
                  N??o h?? pedidos
                </Text>
              </View>
            )
          ))
        }
*/