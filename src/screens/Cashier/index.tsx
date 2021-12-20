import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { OrderProps } from '../../context/OrderContext';
import { useOrders } from '../../hooks/useOrders';
import { styles } from './styles';

export function Cashier(){
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth()+1;
  const year = currentDate.getFullYear();
  const [ orders, setOrders ] = useState<OrderProps[]>([]);
  const [ members, setMembers ] = useState<string[]>([]);
  const { tables } = useOrders();
  
  useEffect(()=>{    
    const _allOrders:OrderProps[] = [];
    const _allMembers:string[] = [];
   
    tables?.forEach(table=>{
      table.members?.forEach(member=>{
        if(!member.orders.length){
          _allMembers.push(member.name);
        }
        member.orders.forEach(order=>{
          if(order.status==='paid'){
            _allOrders.push(order);
          }
        })
      })
    });
    setMembers(_allMembers)
    setOrders(_allOrders);
  },[]);

  return (
    <Background>
      <View style={styles.container}>
        <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
          <View style={{marginBottom: 10, alignItems: 'center', width: '100%'}}>
            <Text style={styles.resume}>
              Resumo do dia 
            </Text>
            <Text style={styles.date}>
              {`${day}/${month}/${year}`}
            </Text>
          </View>

          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.title, {marginLeft: 10}]}>
                {members.length}
              </Text>
              <Text style={styles.label}>
                {' '}Clientes
              </Text>
            </View>
          </View>

          <Text style={styles.header}>
            Taças
          </Text>

          {
            [...new Set(orders.filter(item=>item.type==='cup').map(item=>item.name))].map((name, index)=>(
              <View style={[styles.section, { marginTop: 10 }]} key={index}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subLabel}>
                    {name}:
                  </Text>
                  <Text style={[styles.subtitle, {marginLeft: 10}]}>
                    {orders.filter(item=>item.type==='cup' && item.name===name).length}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subLabel}>
                    R$
                  </Text>
                  <Text style={[styles.subtitle, {marginLeft: 10}]}>
                    {(orders.filter(item=>item.type==='cup' && item.name===name)?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))
          }

          <View style={[styles.section, { marginTop: 10 }]}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>
                Total:
              </Text>
              <Text style={[styles.title, {marginLeft: 10}]}>
                {orders.filter(item=>item.type==='cup').length}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>
                R$
              </Text>
              <Text style={[styles.title, {marginLeft: 10}]}>
                {(orders.filter(item=>item.type==='cup')?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
              </Text>
            </View>
          </View>

          <Text style={styles.header}>
            Barcas
          </Text>

          {
            [...new Set(orders.filter(item=>item.type==='ship').map(item=>item.name))].map((name, index)=>(
              <View style={[styles.section, { marginTop: 10 }]} key={index}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subLabel}>
                    {name}:
                  </Text>
                  <Text style={[styles.subtitle, {marginLeft: 10}]}>
                    {orders.filter(item=>item.type==='cup' && item.name===name).length}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subLabel}>
                    R$
                  </Text>
                  <Text style={[styles.subtitle, {marginLeft: 10}]}>
                    {(orders.filter(item=>item.type==='cup' && item.name===name)?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))
          }

          <View style={styles.section}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>
                Total:
              </Text>
              <Text style={[styles.title, {marginLeft: 10}]}>
                {orders.filter(item=>item.type==='ship').length}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>
                R$
              </Text>
              <Text style={[styles.title, {marginLeft: 10}]}>
                {(orders.filter(item=>item.type==='ship')?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
              </Text>
            </View>
          </View>

          <Text style={styles.header}>
            Águas
          </Text>

          <View style={styles.section}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>
                Total:
              </Text>
              <Text style={[styles.title, {marginLeft: 10}]}>
                {orders.filter(item=>item.name==='Água').length}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>
                R$
              </Text>
              <Text style={[styles.title, {marginLeft: 10}]}>
                {(orders.filter(item=>item.name==='Água')?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
              </Text>
            </View>
          </View>

          <Text style={styles.header}>
            Águas com gás
          </Text>

          <View style={styles.section}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>
                Total:
              </Text>
              <Text style={[styles.title, {marginLeft: 10}]}>
                {orders.filter(item=>item.name==='Água com gás').length}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.label}>
                R$
              </Text>
              <Text style={[styles.title, {marginLeft: 10}]}>
                {(orders.filter(item=>item.name==='Água com gás')?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={{width: '100%', marginTop: 30}}>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
              <Text style={styles.label}>
                Total:
              </Text>
              <Text style={styles.total}>
                {' '}R${(orders.reduce((a,b)=>a+Number(b.price),0)).toFixed(2)}
              </Text>
            </View>
          </View>

        </ScrollView>
      </View>
    </Background>
  );
}