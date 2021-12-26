import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { Fab } from '../../components/Fab';
import { styles } from './styles';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { OrderCard } from '../../components/OrderCard';
import { MenuSelect } from '../../components/MenuSelect';
import { useOrders } from '../../hooks/useOrders';
import { MenuProps } from '../../context/MenuContext';
import { MemberOrdersProps } from '../../routes/types';
import { BorderlessButton } from 'react-native-gesture-handler';

export function MemberOrders({ route, navigation }:MemberOrdersProps){
  const { tableId, memberId } = route.params;
  const { tables, deleteOrder, addOrder, updateOrder } = useOrders();
  const [ isMenuVisible, setMenuVisible ] = useState(false);
  const selectedMember = tables?.find(table=>table.id===tableId)?.members?.find(member=>member.id===memberId);
  const { user } = useOrders();

  const isAdmin = user?.uid==='WlbQiG4RCSeKrNkqSpMvhZWlByE2' || user?.uid==='4s2VROZeAdd5HlJFj18imS4i7hh2';

  const noPaidOrders = selectedMember?.orders?.length? 
    selectedMember.orders.filter(item=>item.status!=='paid')
    .map(item=>parseFloat(item.price))
    :[];

  const subTotal = noPaidOrders?.length? 
    noPaidOrders?.reduce((previous,current)=>previous+current)
    :null;

  function addSelectedItem(selectedMenuItem:MenuProps){
    if(!selectedMenuItem) return;
    setMenuVisible(false);
    
    if(selectedMenuItem.type==='drink'){
      addOrder(tableId, memberId, { 
        name: selectedMenuItem.name,
        price: String(selectedMenuItem.prices[0]),
        type: selectedMenuItem.type
      });
      return;
    }
    navigation.navigate('CreateOrder',{ selectedMenuItem: selectedMenuItem, memberId, tableId });
  }

  async function handleDeleteOrder(orderId:string) {
    deleteOrder(tableId, memberId, orderId)
  }

  async function handlePayment(tableId:string, memberId: string, orderId: string){
    updateOrder(tableId, memberId, orderId, 'paid');
  }

  return (
    <Background>
      <View style={styles.tableLabel}>
        <BorderlessButton onPress={()=>navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={theme.colors.text} />
        </BorderlessButton>
        <Text style={styles.title}>
          {selectedMember?.name}
        </Text>
        <View style={{width: 20}} ></View>
      </View>
      
      <View style={styles.container}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25}}>
          <Text style={styles.subtitle}>
            Pedidos
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.subtotal}>
              Subtotal 
            </Text>
            <Text style={styles.subtotalNumber}>
              R$ {(subTotal?.toFixed(2))||0}
            </Text>
          </View>
        </View>

        <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView style={{flex: 1, width: '100%'}} fadingEdgeLength={100} showsVerticalScrollIndicator={false}>
            {selectedMember?.orders.length?
              selectedMember.orders.map((item, index)=>(
                <OrderCard
                  order={item}
                  key={index}
                  editOrder={()=>navigation.navigate('EditOrder', { 
                    tableId, memberId, order: item
                  })}
                  actionName="Pagar"
                  showAction={item.status==='done'}
                  isAdmin={isAdmin}
                  action={()=>handlePayment(tableId, memberId, item.id)}
                />
              ))
              :
              <View style={{height: 500, justifyContent: 'center'}}>
                <Text style={styles.noMembersMessage}>
                  Este cliente ainda não fez pedidos 
                </Text>
              </View>
            }
          </ScrollView>
        </View>
      </View>
      <Fab
        onPress={()=>setMenuVisible(true)}
        icon={<Entypo name="plus" size={30} color={theme.colors.text}/>}
      />
      <MenuSelect 
        isVisible={isMenuVisible}
        closeModal={()=>setMenuVisible(false)}
        addSelectedItem={addSelectedItem}
      />
    </Background>
  );
}