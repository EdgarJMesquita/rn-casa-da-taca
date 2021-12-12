import React from 'react';
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import { Background } from '../../components/Background';
import Lisboa from '../../assets/lisboa.png';
import { styles } from './styles';
import { Fab } from '../../components/Fab';

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

export function Menu(){
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
      <Fab />
    </Background>
  );
}