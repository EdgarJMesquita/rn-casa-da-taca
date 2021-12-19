import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './styles';

type BackgroundType = {
  children: ReactNode;
}

export function Background({children}:BackgroundType){
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  );
}