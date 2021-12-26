import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { MenuProps } from '../../context/MenuContext';
import { theme } from '../../global/theme';
import { useMenu } from '../../hooks/useMenu';
import { MenuCard } from '../MenuCard';
import { styles } from './styles';

type ModalSelectProps = {
  isVisible: boolean;
  closeModal: ()=>void;
  addSelectedItem: (order:MenuProps)=>void;
}

export function MenuSelect({isVisible, closeModal, addSelectedItem}:ModalSelectProps){
  const { getMenu } = useMenu();
  const [ menu, setMenu ] = useState<MenuProps[]>([]);
  
  useEffect(()=>{
    if(!isVisible)return;
    (async()=>{
      const _menu = await getMenu();
      setMenu(_menu);
    })();
  },[isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      useNativeDriver
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{margin: 0}}
      propagateSwipe
    >
      <Pressable style={styles.container}>
        <View style={styles.topBar}></View>
        <ScrollView style={{flex: 1 ,width: '80%'}}>
          {
            menu? (
              menu.map((item, index)=>(
                <MenuCard 
                  item={item}
                  action={()=>addSelectedItem(item)}
                  key={index}
                />
              ))
            ) : (
              <View style={{height: 500, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={30} color={theme.colors.primary} />
              </View>
            )
          }
        </ScrollView>
      </Pressable>
    </Modal>
  );
}