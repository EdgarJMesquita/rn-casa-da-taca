import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { theme } from '../../global/theme';
import { FontAwesome, FontAwesome5, Fontisto, AntDesign } from '@expo/vector-icons'; 
import { styles } from './styles';
import { FlavorSelect } from '../../components/FlavorSelect';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useMenu } from '../../hooks/useMenu';
import { Background } from '../../components/Background';
import { useOrders } from '../../hooks/useOrders';
import { EditOrderProps } from '../../routes/types';
import { MenuProps } from '../../context/MenuContext';

export function EditOrder({ route, navigation}:EditOrderProps){
  const { order, memberId, tableId } = route.params;
  const [ firstFlavor, setFirstFlavor ] = useState(order?.firstFlavor?order.firstFlavor:'');
  const [ secondFlavor, setSecondFlavor ] = useState(order?.secondFlavor? order.secondFlavor:'');
  const [ observation, setObservation ] = useState(order?.observation? order.observation:'');
  const [ showFirstFlavorSelect, setShowFirstFlavorSelect ] = useState(false);
  const [ showSecondFlavorSelect, setShowSecondFlavorSelect ] = useState(false);
  const { getFlavours, getMenu } = useMenu();
  const { editOrder, deleteOrder } = useOrders();
  const [ flavours, setFlavours ] = useState<string[]>();
  const [ selectedMenuItem, setSelectedMenuItem ] = useState<MenuProps>();
  const [ size, setSize ] = useState<number>([250,330,600].indexOf(order.size));

  async function handleEditOrder() {
    if(!firstFlavor || !selectedMenuItem?.name) return;
    
    const updatedOrder = {
      id: order.id,
      name: selectedMenuItem?.name,
      firstFlavor,
      observation,
      price: String(selectedMenuItem?.prices[size]),
      secondFlavor: 
        (selectedMenuItem?.sizes[size]===330 || selectedMenuItem?.sizes[size] === 600 || selectedMenuItem?.type==="ship")? 
        secondFlavor:'',
      size: selectedMenuItem?.sizes[size],
      type: selectedMenuItem.type
    }

    try {
      const orderRef = await editOrder(tableId, memberId, updatedOrder);
      //if(!orderRef) return;
      navigation.goBack();

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    (async()=>{
      const _flavours = await getFlavours();
      setFlavours(_flavours);
    })();
  },[]);

  useEffect(()=>{
    (async()=>{
      const _menu = await getMenu();
      setSelectedMenuItem(_menu.find(item=>item.name===order.name));
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
          <BorderlessButton
            onPress={()=>deleteOrder(tableId, memberId, order.id)}
            style={styles.close}
          >
            <AntDesign 
              name="close"
              size={20}
              color={theme.colors.primary}
            />
          </BorderlessButton>
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
                onPress={handleEditOrder}
                style={styles.submitButton}
                >
                <Text style={styles.submitButtonText}>
                  Atualizar
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