import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Background } from '../../components/Background';
import { ConfirmModal } from '../../components/ConfirmModal';
import { OrderProps, TableProps } from '../../context/OrderContext';
import { theme } from '../../global/theme';
import { useOrders } from '../../hooks/useOrders';
import DatePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { format } from 'date-fns';
import { styles } from './styles';
export function Cashier(){
  const [ orders, setOrders ] = useState<OrderProps[]>([]);
  const [ members, setMembers ] = useState<string[]>([]);
  const { tables, closeDay, fetchReport } = useOrders();
  const [ isVisible, setVisible ] = useState(false);
  const [ isLoading, setLoading ] = useState(false);
  const [ show, setShow ] = useState(false);
  const [ date, setDate ] = useState<Date>(new Date());

  const onChange = (event:any, selectedDate?:Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  async function handleCloseDay() {
    if(!tables) return;

    try {
      setVisible(false);
      setLoading(true);
      await closeDay(tables);
      setOrders([]);

    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  }

  function parseTablesToArray(data: TableProps[]|undefined) {
    const allOrders:OrderProps[] = [];
    const allMembers:string[] = [];
  
    data?.forEach(table=>{
      table.members?.forEach(member=>{
        if(member.orders?.length!==0){
          allMembers.push(member.name);
        }
        member.orders?.forEach(order=>{
          if(order?.status==='paid'){
            allOrders.push(order);
          }
        })
      })
    });

    return {
      allOrders: allOrders,
      allMembers: allMembers      
    }
  }

  useEffect(()=>{
    if(format(date,'dd/MM/yyyy')!==format(new Date(),'dd/MM/yyyy')) return;

    const { allOrders, allMembers } = parseTablesToArray(tables)
    setOrders(allOrders);
    setMembers(allMembers);

  },[tables, date]);

  useEffect(()=>{
    if(format(date,'dd/MM/yyyy')===format(new Date(),'dd/MM/yyyy')) return;
    async function handleFetchReport() {
      const year = date.getFullYear();
      const month = date.getMonth()+1;
      const day = date.getDate();

      try {
        setLoading(true);
        const history = await fetchReport(year, month, day);
        if(history){
          const { allOrders, allMembers } = parseTablesToArray(history);
          setOrders(allOrders);
          setMembers(allMembers);
        }
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    }
    handleFetchReport();
  },[date])

  return (
    <Background>
      {show && (
        <DatePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate={new Date('2021-12-26')}
        />
      )}
      <View style={styles.container}>
        <ScrollView 
          style={{width: '100%'}} 
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={100}
          contentContainerStyle={{paddingBottom: 70}}
        >
          <View style={{marginBottom: 10, alignItems: 'center', width: '100%'}}>
            <Text style={styles.resume}>
              Resumo do dia 
            </Text>
            <TouchableOpacity
              onPress={()=>setShow(true)}
              style={{flexDirection: 'row'}}
            >
              <Text style={styles.date}>
                {format(date, 'dd/MM/yyyy')}
              </Text>
              {
                isLoading?(
                  <ActivityIndicator size={24} color={theme.colors.primary} style={{marginLeft: 10}}/>                  
                ):(
                  <FontAwesome name="search" size={24} color={theme.colors.primary} style={{marginLeft: 10}}/>
                )
              }
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.title}>
                {members?.length}
              </Text>
              <Text style={styles.label}>
                {' '}Clientes
              </Text>
            </View>
          </View>

          <Text style={styles.header}>
            Ta??as
          </Text>
          {
            [...new Set(orders.filter(item=>item.type==='cup').map(item=>item.name))].map((name, index)=>(
              <View style={[styles.section,{ marginTop: 10 }]} key={index}>
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
              <Text style={styles.subLabel}>
                Total:
              </Text>
              <Text style={[styles.subtitle, {marginLeft: 10}]}>
                {orders.filter(item=>item.type==='cup').length}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subLabel}>
                R$
              </Text>
              <Text style={[styles.subtitle, {marginLeft: 10}]}>
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
                    {orders.filter(item=>item.type==='ship' && item.name===name).length}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subLabel}>
                    R$
                  </Text>
                  <Text style={[styles.subtitle, {marginLeft: 10}]}>
                    {(orders.filter(item=>item.type==='ship' && item.name===name)?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))
          }
          <View style={styles.section}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subLabel}>
                Total:
              </Text>
              <Text style={[styles.subtitle, {marginLeft: 10}]}>
                {orders.filter(item=>item.type==='ship').length}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subLabel}>
                R$
              </Text>
              <Text style={[styles.subtitle, {marginLeft: 10}]}>
                {(orders.filter(item=>item.type==='ship')?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
              </Text>
            </View>
          </View>

          <Text style={styles.header}>
            ??guas
          </Text>
          <View style={styles.section}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subLabel}>
                Total:
              </Text>
              <Text style={[styles.subtitle, {marginLeft: 10}]}>
                {orders.filter(item=>item.name==='??gua').length}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subLabel}>
                R$
              </Text>
              <Text style={[styles.subtitle, {marginLeft: 10}]}>
                {(orders.filter(item=>item.name==='??gua')?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
              </Text>
            </View>
          </View>

          <Text style={styles.header}>
            ??guas com g??s
          </Text>
          <View style={styles.section}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subLabel}>
                Total:
              </Text>
              <Text style={[styles.subtitle, {marginLeft: 10}]}>
                {orders.filter(item=>item.name==='??gua com g??s').length}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subLabel}>
                R$
              </Text>
              <Text style={[styles.subtitle, {marginLeft: 10}]}>
                {(orders.filter(item=>item.name==='??gua com g??s')?.reduce((a,b)=>a+parseFloat(b.price),0)).toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={{width: '100%', marginTop: 50}}>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
              <Text style={styles.total}>
                Total:
              </Text>
              <Text style={styles.totalValue}>
                {' '}R${(orders.reduce((a,b)=>a+Number(b.price),0)).toFixed(2)}
              </Text>
            </View>
          </View>

          {
            format(date,'dd/MM/yyyy')===format(new Date(),'dd/MM/yyyy') && !!orders &&
            <RectButton 
              style={styles.button}
              onPress={()=>!isLoading && setVisible(true)}
            >
              {
                !isLoading?
                <Text style={styles.buttonTitle}>
                  Encerrar venda
                </Text>
                :
                <ActivityIndicator size={20} color={theme.colors.text}/>
              }
            </RectButton>
          }

        </ScrollView>
      </View>
      <ConfirmModal 
        isVisible={isVisible}
        action={handleCloseDay}
        closeModal={()=>setVisible(false)}
      />
    </Background>
  );
}