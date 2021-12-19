import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { Fab } from '../../components/Fab';
import { MemberDetailsProps } from '../../routes/auth.routes';
import { styles } from './styles';
import { Entypo } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { Card } from '../../components/Card';
import { MenuSelect } from '../../components/MenuSelect';
import { useOrders } from '../../hooks/useOrders';
import { MenuProps } from '../../context/MenuContext';

export function MemberDetails({ route, navigation }:MemberDetailsProps){
  const { tableId, memberId } = route.params;
  const { tables, deleteOrder, addOrder } = useOrders();
  const [ isMenuVisible, setMenuVisible ] = useState(false);

  const selectedMember = tables.find(table=>table.id===tableId)?.members?.find(member=>member.id===memberId);

  function addSelectedItem(selectedMenuItem:MenuProps){
    if(!selectedMenuItem) return;
    setMenuVisible(false);

    if(selectedMenuItem.type==='drink'){
      addOrder(tableId, memberId, { 
        name: selectedMenuItem.name,
        price: String(selectedMenuItem.prices[0])
      });
      
      return;
    }

    navigation.navigate('CreateOrder',{ selectedMenuItem, memberId, tableId });
  }

  async function handleDeleteOrder(orderId:string) {
    deleteOrder(tableId, memberId, orderId)
  }

  return (
    <Background>
      <View style={styles.tableLabel}>
        <Text style={styles.title}>
          {selectedMember?.name}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Pedidos
        </Text>
        <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView style={{flex: 1, width: '100%'}} fadingEdgeLength={100}>
            {console.log(selectedMember?.orders)}
            {selectedMember?.orders?
              selectedMember.orders.map((item, index)=>(
                <Card
                  order={item}
                  key={index}
                  deleteOrder={()=>handleDeleteOrder(item.id)}
                />
              ))
              :
              <Text style={styles.noMembersMessage}>
                Este cliente ainda não fez pedidos 
              </Text>
            }
          </ScrollView>
        </View>
      </View>
      <Fab
        onPress={()=>setMenuVisible(true)}
        icon={
          <Entypo name="plus" size={30} color={theme.colors.text}/>
        }
      />
      <MenuSelect 
        isVisible={isMenuVisible}
        closeModal={()=>setMenuVisible(false)}
        addSelectedItem={addSelectedItem}
      />
    </Background>
  );
}