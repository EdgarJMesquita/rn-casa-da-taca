import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import RNModal from 'react-native-modal';
import { theme } from '../../global/theme';
import { styles } from './styles';

type PromptTableModalProps = {
  isVisible: boolean;
  text: string;
  label: string;
  closeModal: ()=>void;
  action: ()=>void;
  setText: (value:string)=>void;
}

export function PromptModal({ isVisible, action, closeModal, text, setText, label }:PromptTableModalProps){
  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      animationIn="bounceInDown"
      animationOut="bounceOutDown"
      style={{margin: 0, paddingHorizontal: 20}}
      backdropOpacity={0.2}
      useNativeDriver
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          {label}
        </Text>
        <TextInput 
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
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
              Adicionar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
}