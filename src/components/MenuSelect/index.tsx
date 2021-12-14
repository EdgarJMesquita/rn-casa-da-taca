import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { MenuItem } from '../MenuItem';
import { styles } from './styles';

type ModalSelectProps = {
  isVisible: boolean;
  closeModal: ()=>void;
  data: string[];
  addSelectedItem: (value:string)=>void;
}

export function MenuSelect({isVisible, closeModal, data, addSelectedItem}:ModalSelectProps){
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      useNativeDriver
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{margin: 0}}
      swipeDirection="down"
      onSwipeComplete={closeModal}
      swipeThreshold={100}
      propagateSwipe
    >
      <Pressable 
        style={styles.container}
      >
        <View style={styles.topBar}></View>
        <ScrollView style={{width: '80%'}}>
          {
            data.map((cup, index)=>(
              <MenuItem 
                name={cup}
                action={()=>addSelectedItem(cup)}
                key={index}
              />
            ))
          }
        </ScrollView>
      </Pressable>
    </Modal>
  );
}