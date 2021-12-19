import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { theme } from '../../global/theme';
import { FontAwesome } from '@expo/vector-icons'; 
import { styles } from './styles';
import { FlavorSelect } from '../../components/FlavorSelect';
import { RectButton } from 'react-native-gesture-handler';
import { useMenu } from '../../hooks/useMenu';
import { CreateOrderProps } from '../../routes/auth.routes';
import { Background } from '../../components/Background';
import { useOrders } from '../../hooks/useOrders';

export function CreateOrder({route, navigation}:CreateOrderProps){
  const { selectedMenuItem, memberId, tableId } = route.params;

  const [ size, setSize ] = useState<number>(0);
  const [ firstFlavor, setFirstFlavor ] = useState('');
  const [ secondFlavor, setSecondFlavor ] = useState('');
  const [ observation, setObservation ] = useState('');
  const [ showFirstFlavorSelect, setShowFirstFlavorSelect ] = useState(false);
  const [ showSecondFlavorSelect, setShowSecondFlavorSelect ] = useState(false);
  const { flavors } = useMenu();
  const { addOrder } = useOrders();

  async function handleAddOrder() {
    if(!firstFlavor || !selectedMenuItem?.name) return;

    const order = {
      name: selectedMenuItem?.name,
      firstFlavor,
      observation,
      price: String(selectedMenuItem?.prices[size]),
      secondFlavor: 
        (selectedMenuItem?.sizes[size]===330 || selectedMenuItem?.sizes[size] === 600 || selectedMenuItem?.type==="ship")? 
        secondFlavor:'',
      size: selectedMenuItem.sizes[size]
    }
    try {
      const orderRef = await addOrder(tableId, memberId, order);
      if(!orderRef) return;
      navigation.goBack();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>{selectedMenuItem?.name}</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Tamanho*</Text>
          <View style={{flexDirection: 'row'}}>
            {
              selectedMenuItem?.sizes.map((item, index)=>(
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

          { (selectedMenuItem?.sizes[size]===330 || selectedMenuItem?.sizes[size] === 600 || selectedMenuItem?.type==="ship") &&
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
          data={flavors}
          setFlavor={setFirstFlavor}
          />

        <FlavorSelect 
          isVisible={showSecondFlavorSelect}
          closeModal={()=>setShowSecondFlavorSelect(false)}
          data={flavors}
          setFlavor={setSecondFlavor}
          />
      </View>
    </Background>
  );
}