import React from 'react';
import { View, Text, Image } from 'react-native';
import { theme } from '../../global/theme';
import { styles } from './styles';
import { OrderProps } from '../../context/OrderContext';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { MaterialIcons, Feather } from '@expo/vector-icons';

type CardProps = {
  order: OrderProps;
  action?: ()=>void;
  isAdmin?: boolean;
  editOrder?: ()=>void;
  actionName: string;
  showAction: boolean;
}

export function OrderCard({ order, showAction, action, actionName, isAdmin, editOrder }:CardProps){
  
  if(order.type==='drink'){
    return(
      <View style={styles.drinkCard}>
        <View style={styles.leftBar}></View>

        <View style={{flex: 1, width: '100%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="local-drink" color={theme.colors.primary} size={25} />
              <Text style={styles.drinkTitle}>
                {order.name}
              </Text>
              <MaterialIcons 
                name={order.status==='paid'? 'attach-money':'money-off'} 
                size={30}
                style={{marginLeft: 5}} 
                color={order.status==='paid'? 'green':theme.colors.primary}
              />
            </View>
            
            <View>
              <Text style={styles.drinkTotal}>
                R$ {order.price}
              </Text>
            </View>
          </View>
          {
            isAdmin && order.status!=='paid' && (
              <View style={{width: '100%', alignItems: 'flex-end', paddingBottom: 10, paddingRight: 10}}>
                <RectButton 
                  onPress={action}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>
                    Pagar
                  </Text>
                </RectButton>
              </View>
            )
          }
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {
        order.status!=='paid' && !!editOrder && (
          <BorderlessButton 
            onPress={editOrder}
            style={styles.close}
          >
            <Feather name="edit" size={20} color={theme.colors.white} />
          </BorderlessButton>
        )
      }
      <View style={styles.leftBar}></View>

      <View style={{flex: 1, width: '100%'}}>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.title}>{order.name}</Text>
          <MaterialIcons 
            name={order.status==='paid'? 'attach-money':'money-off'} 
            size={30}
            style={{marginLeft: 5, marginTop: 7}} 
            color={order.status==='paid'? 'green':theme.colors.primary}
          />
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
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={styles.total}>
                R$ {order.price}
              </Text>
              {
                isAdmin && order.status!=='cancelled' && showAction && (
                  <RectButton 
                    onPress={action}
                    style={[styles.submitButton, { marginLeft: 10 }]}
                  >
                    <Text style={styles.submitButtonText}>
                      {actionName}
                    </Text>
                  </RectButton>
                )
              }
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}