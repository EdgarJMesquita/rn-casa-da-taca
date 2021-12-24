import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { FlavorCard } from '../FlavorCard';
import { styles } from './styles';

type ModalSelectProps = {
  isVisible: boolean;
  closeModal: ()=>void;
  data: string[]|undefined;
  setFlavor: (value:string)=>void;
}

export function FlavorSelect({isVisible, closeModal, data, setFlavor}:ModalSelectProps){
  function handleSelectFlavor(flavor:string){
    setFlavor(flavor);
    closeModal();
  }

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
            data?.map((flavor, index)=>(
              <FlavorCard 
                flavor={flavor}
                action={()=>handleSelectFlavor(flavor)}
                key={index}
              />
            ))
          }
        </ScrollView>
      </Pressable>
    </Modal>
  );
}