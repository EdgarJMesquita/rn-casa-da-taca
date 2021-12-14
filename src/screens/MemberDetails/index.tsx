import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { Fab } from '../../components/Fab';
import { Member } from '../../components/Member';
import { MemberDetailsProps } from '../../routes/auth.routes';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { Card } from '../../components/Card';
import { FlavorSelect } from '../../components/FlavorSelect';
import { MenuSelect } from '../../components/MenuSelect';

type OrderProps = {
  name: string;
  price250?: number;
  price330?: number;
  flavor?: string;
  secondFlavor?: string;
  observation?: string;
}

const data = [
  {
    name: 'Rio',
    type: 'cup',
    '250': 13.50,
    '330': 16.00,
  },
  {
    name: 'Denver',
    type: 'cup',
    '250': 14.00,
    '330': 18.00,
  },
  {
    name: 'Tokyo',
    type: 'cup',
    '250': 15.00,
    '330': 18.00,
  },
  {
    name: 'Nairóbi',
    type: 'cup',
    '250': 15.00,
    '330': 18.00,
  },
  {
    name: 'Moscou',
    type: 'cup',
    '250': 16.00,
    '330': 19.00,
  },
  {
    name: 'Estocolmo',
    type: 'cup',
    '250': 17.00,
    '330': 20.00,
  },
  {
    name: 'Denver',
    type: 'cup',
    '250': 13.50,
    '330': 16.50,
  },
  {
    name: 'Berlin',
    type: 'cup',
    '250': 19.00,
  },
  {
    name: 'Palermo',
    type: 'cup',
    '330': 20.00,
  },
  {
    name: 'Lisboa',
    type: 'cup',
    '600': 22.00,
  },
  {
    name: 'Professor',
    type: 'cup',
    '600': 23.00,
  },
  {
    name: 'Helsinki',
    type: 'ship',
    price: 24.00,
  },
  {
    name: 'Bogotá',
    type: 'ship',
    price: 28.00,
  },
  {
    name: 'water',
    price: 2.00
  },
  {
    name: 'water gas',
    price: 2.50
  }

]

type CupProps = {
  name: string;
  price250?: string;
  price330?: string;
  flavor?: string;
  secondFlavor?: string;
  observation?: string;
}

export function MemberDetails({ route, navigation }:MemberDetailsProps){
  const table = route.params.table;
  const member = route.params.member;

  const [ orders, setOrders ] = useState<OrderProps[]>([]);
  const [ isMenuVisible, setMenuVisible ] = useState(false);

  function addSelectedItem(name: string){
    setOrders(prev=>[...prev, { name }]);
  }

  return (
    <Background>
      <View style={styles.tableLabel}>
        <Text style={styles.title}>
          {member}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Pedidos
        </Text>
        <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView style={{flex: 1, width: '100%'}}>
            {orders?
              orders.map((item, index)=>(
                <Card
                  name={item.name}
                  key={index}
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
          <FontAwesome 
            name="user-plus" 
            size={20} 
            color={theme.colors.text} 
            style={{marginLeft: 3, marginBottom: 2.2}}
          />
        }
      />
      <MenuSelect 
        isVisible={isMenuVisible}
        closeModal={()=>setMenuVisible(false)}
        data={data.map(item=>item.name)}
        addSelectedItem={addSelectedItem}
      />
    </Background>
  );
}