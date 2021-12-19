import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { MenuProps } from '../../context/MenuContext';
import { useMenu } from '../../hooks/useMenu';
import { MenuCard } from '../MenuCard';
import { styles } from './styles';

type ModalSelectProps = {
  isVisible: boolean;
  closeModal: ()=>void;
  addSelectedItem: (order:MenuProps)=>void;
}

export function MenuSelect({isVisible, closeModal, addSelectedItem}:ModalSelectProps){
  const { menu } = useMenu();

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
        <ScrollView style={{width: '80%'}}>
          {
            menu?.map((item, index)=>(
              <MenuCard 
                item={item}
                action={()=>addSelectedItem(item)}
                key={index}
              />
            ))
          }
        </ScrollView>
      </Pressable>
    </Modal>
  );
}