import React, { useState } from 'react';
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import { Background } from '../../components/Background';
import Lisboa from '../../assets/lisboa.png';
import { styles } from './styles';
import { Fab } from '../../components/Fab';
import { PromptModal } from '../../components/PromptModal';
import { StackScreensProps } from '../../routes/auth.routes';
import { theme } from '../../global/theme';
import { Entypo } from '@expo/vector-icons';

const data = [
  {
    source: Lisboa,
    size250: '250 ml  R$ 15.50',
    size330: '330 ml  R$ 18.50'
  },
  {
    source: Lisboa,
    size250: '250 ml  R$ 15.50',
    size330: '330 ml  R$ 18.50'
  },
  {
    source: Lisboa,
    size250: '250 ml  R$ 15.50',
    size330: '330 ml  R$ 18.50'
  },
]

export function Menu({navigation}:StackScreensProps){
  const [ isVisible, setVisible ] = useState(false);
  const [ table, setTable ] = useState('');

  async function handleCreateTable() {
    if(!table) return;
    setVisible(false);
    setTable('');
    navigation.navigate('TableDetails', { table });
  }

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>
          Taças
        </Text>
        <ScrollView style={{flex: 1, width: '100%'}}>
          {
            data.map((item, index)=>(
              <ImageBackground
                key={index}
                source={item.source}
                style={{height: 400, width: '100%', borderRadius: 5, marginBottom: 20}}
                resizeMode="contain"
              >
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>
                    {item.size250}
                  </Text>
                  <Text style={styles.price}>
                    {item.size330}
                  </Text>
                </View>
              </ImageBackground>
            ))
          }
        </ScrollView>
      </View>
      <Fab 
        onPress={()=>setVisible(prev=>!prev)}
        icon={<Entypo name="plus" size={30} color={theme.colors.text}/>}
      />
      <PromptModal
        isVisible={isVisible}
        label="Digite a mesa:"
        closeModal={()=>setVisible(prev=>!prev)}
        action={handleCreateTable}
        setText={setTable}
        text={table}
      />
    </Background>
  );
}