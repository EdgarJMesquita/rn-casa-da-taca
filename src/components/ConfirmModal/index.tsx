import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import RNModal from 'react-native-modal';
import { theme } from '../../global/theme';
import { styles } from './styles';

type PromptTableModalProps = {
  isVisible: boolean;
  closeModal: ()=>void;
  action: ()=>void;
}

export function ConfirmModal({ isVisible, action, closeModal }:PromptTableModalProps){
  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      animationIn="bounceInDown"
      animationOut="bounceOutDown"
      style={{margin: 0, paddingHorizontal: 20}}
      backdropOpacity={0.4}
      useNativeDriver
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          Deseja mesmo encerrar o dia?
        </Text>
       
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
          <TouchableOpacity 
            onPress={closeModal}
            style={styles.button}
          >
            <Text style={styles.buttonTitle}>
              Voltar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={action}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
          >
            <Text style={styles.buttonTitle}>
              Encerrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
}