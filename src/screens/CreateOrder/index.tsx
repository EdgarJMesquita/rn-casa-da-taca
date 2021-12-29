import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { theme } from '../../global/theme';
import { FontAwesome, FontAwesome5, Fontisto } from '@expo/vector-icons'; 
import { styles } from './styles';
import { FlavorSelect } from '../../components/FlavorSelect';
import { RectButton } from 'react-native-gesture-handler';
import { useMenu } from '../../hooks/useMenu';
import { Background } from '../../components/Background';
import { useOrders } from '../../hooks/useOrders';
import { CreateOrderProps } from '../../routes/types';

export function CreateOrder({ route, navigation}:CreateOrderProps){
  const { selectedMenuItem, memberId, tableId } = route.params;
  const [ size, setSize ] = useState<number>(0);
  const [ firstFlavor, setFirstFlavor ] = useState('');
  const [ secondFlavor, setSecondFlavor ] = useState('');
  const [ observation, setObservation ] = useState('');
  const [ showFirstFlavorSelect, setShowFirstFlavorSelect ] = useState(false);
  const [ showSecondFlavorSelect, setShowSecondFlavorSelect ] = useState(false);
  const { getFlavours } = useMenu();
  const { addOrder } = useOrders();
  const [ flavours, setFlavours ] = useState<string[]>();

  async function handleAddOrder() {
    if(!firstFlavor || !selectedMenuItem?.name) return;

    if(selectedMenuItem.type==='cup'){
      // Cups
      const order = {
        name: selectedMenuItem?.name,
        firstFlavor,
        observation,
        price: String(selectedMenuItem?.prices[size]),
        secondFlavor: selectedMenuItem?.sizes[size] !== 250? secondFlavor:'',
        size: selectedMenuItem?.sizes[size],
        type: selectedMenuItem.type,
        status: 'new'
      }
  
      try {
        const orderRef = await addOrder(tableId, memberId, order);
        if(!orderRef) return;
        
        navigation.goBack();
  
      } catch (error) {
        console.log(error);
      }

    } else {
      // Ships
      const order = {
        name: selectedMenuItem?.name,
        firstFlavor,
        observation,
        price: String(selectedMenuItem?.prices[size]),
        secondFlavor: secondFlavor,
        type: selectedMenuItem.type,
        status: 'new'
      }
  
      try {
        const orderRef = await addOrder(tableId, memberId, order);
        if(!orderRef) return;
        
        navigation.goBack();
  
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(()=>{
    (async()=>{
      const _menu = await getFlavours();
      setFlavours(_menu);
    })();
  },[]);

  return (
    <Background>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        {
          selectedMenuItem?.type==='cup'?
          <FontAwesome5 name="wine-glass" color={theme.colors.primary} size={20} />:
          <Fontisto name="ship" color={theme.colors.primary} size={20} />
        }
          <Text style={styles.title}>{selectedMenuItem?.name}</Text>
        </View>

        <View style={styles.form}>
          {
            selectedMenuItem?.type==='cup' && <Text style={styles.label}>Tamanho*</Text>
          }
          <View style={{flexDirection: 'row'}}>
            {
              selectedMenuItem?.sizes?.map((item, index)=>(
                <TouchableOpacity
                  onPress={()=>setSize(index)} 
                  style={[styles.button, { borderColor: size===index? theme.colors.primary: 'transparent' }]}
                  key={index}
                  >
                  <Text style={styles.buttonTitle}>
                    {item} ml
                  </Text>
                </TouchableOpacity>
              ))
            }
            
          </View>

          <Text style={[styles.label, {marginTop: 10}]}>
            Sabor*
          </Text>
          <TouchableOpacity 
            onPress={()=>setShowFirstFlavorSelect(true)}
            style={styles.select}
            >
            <Text style={styles.text}>
              {firstFlavor? firstFlavor : 'Escolha um sabor'}
            </Text>
            <FontAwesome name="caret-down" size={20} color={theme.colors.text} />
          </TouchableOpacity>

          { (selectedMenuItem?.type==="ship" || selectedMenuItem?.sizes[size]===330 || selectedMenuItem?.sizes[size] === 600 ) &&
            <>
              <Text style={[styles.label, {marginTop: 10}]}>
                Segundo sabor
              </Text>
              <TouchableOpacity 
                onPress={()=>setShowSecondFlavorSelect(true)}
                style={styles.select}
              >
                <Text style={styles.text}>
                  {secondFlavor? secondFlavor : 'Escolha um sabor'}
                </Text>
                <FontAwesome name="caret-down" size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </>
          }

          <Text style={[styles.label, {marginTop: 10}]}>
            Observação(opcional)
          </Text>
          <TextInput
            value={observation}
            onChangeText={setObservation}
            placeholder="Digite uma observação..."
            style={styles.textArea}
            placeholderTextColor={theme.colors.text}
            multiline
          />

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.total}>
                R$ {selectedMenuItem?.prices[size]}
              </Text>
              <RectButton 
                onPress={handleAddOrder}
                style={styles.submitButton}
                >
                <Text style={styles.submitButtonText}>
                  Salvar
                </Text>
              </RectButton>
            </View>
          </View>
        </View>

        <FlavorSelect 
          isVisible={showFirstFlavorSelect}
          closeModal={()=>setShowFirstFlavorSelect(false)}
          data={flavours}
          setFlavor={setFirstFlavor}
          />

        <FlavorSelect 
          isVisible={showSecondFlavorSelect}
          closeModal={()=>setShowSecondFlavorSelect(false)}
          data={flavours}
          setFlavor={setSecondFlavor}
          />
      </View>
    </Background>
  );
}