import React from 'react';
import { View, Text, Image } from 'react-native';
import Taca from '../../assets/taca.png';
import { theme } from '../../global/theme';
import { styles } from './styles';
import { OrderProps } from '../../context/OrderContext';
import { BorderlessButton } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

type CardProps = {
  order: OrderProps;
  deleteOrder: ()=>void;
}

export function OrderCard({ order, deleteOrder }:CardProps){

  if(order.type==='drink'){
    return(
      <View style={styles.drinkCard}>
        <View style={styles.leftBar}></View>

        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'}}>
          <MaterialIcons name="local-drink" color={theme.colors.primary} size={25} />
          <Text style={styles.drinkTitle}>
            {order.name}
          </Text>
        </View>
        
        <Text style={styles.drinkTotal}>
          R$ {order.price}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BorderlessButton 
        onPress={deleteOrder}
        style={styles.close}
      >
        <AntDesign name="close" size={20} color={theme.colors.white} />
      </BorderlessButton>
      <View style={styles.leftBar}></View>

      <View style={{width: '35%'}}>
        <Text style={styles.title}>{order.name}</Text>
        <Image source={Taca} style={{marginTop: 35, alignSelf: 'center'}}/>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Tamanho</Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[styles.button, { borderColor: theme.colors.primary }]}
          >
            <Text style={styles.buttonTitle}>
              {order.size} ml
            </Text>
          </View>
        </View>

        <Text style={[styles.label, {marginTop: 10}]}>
          Sabor
        </Text>
        <View 
          style={styles.select}
        >
          <Text style={styles.text}>
            {order.firstFlavor}
          </Text>
        </View>

        { !!order.secondFlavor &&
          <>
            <Text style={[styles.label, {marginTop: 10}]}>
              Segundo sabor
            </Text>
            <View 
              style={styles.select}
            >
              <Text style={styles.text}>
                {order.secondFlavor}
              </Text>
            </View>
          </>
        }

        <Text style={[styles.label, {marginTop: 10}]}>
          Observação
        </Text>
        <Text style={styles.textArea}>
          {order.observation || 'Sem observação'}
        </Text>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={styles.total}>
            R$ {order.price}
          </Text>
        </View>
      </View>
    </View>
  );
}