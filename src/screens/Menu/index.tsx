import React from 'react';
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import { Background } from '../../components/Background';
import Bogota from '../../assets/bogota.jpg';
import Helsinki from '../../assets/helsinki.jpg';
import Denver from '../../assets/denver.jpeg';
import Estocolmo from '../../assets/estocolmo.jpeg';
import Manila from '../../assets/manila.jpeg';
import Nairobi from '../../assets/nairobi.jpeg';
import Professor from '../../assets/professor.jpeg';
import Rio from '../../assets/rio.jpeg';
import Tokyo from '../../assets/tokyo.jpeg';
import Lisboa from '../../assets/lisboa.png';
import Sierra from '../../assets/sierra.jpeg';

import { styles } from './styles';


const data = [
  {
    source: Professor,
    name: 'Professor'
  },
 
  {
    source: Lisboa,
    name: 'Lisboa'
  },
  {
    source: Sierra,
    name: 'Sierra',
  },
  {
    source: Bogota,
    name: 'Bogota',
  },
  {
    source: Helsinki,
    name: 'Helsinki'
  },
  {
    source: Manila,
    name: 'Manila'
  },
  {
    source: Denver,
    name: 'Denver'
  },
  {
    source: Estocolmo,
    name: 'Estocolmo'
  },
 
 
  {
    source: Nairobi,
    name: 'Nairóbi'
  },
 
  {
    source: Rio,
    name: 'Rio'
  },
  
  {
    source: Tokyo,
    name: 'Tokyo'
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
                {/* <View style={styles.priceContainer}>
                  <Text style={styles.price}>
                    {item.size250}
                  </Text>
                  <Text style={styles.price}>
                    {item.size330}
                  </Text>
                </View> */}
              </ImageBackground>
            ))
          }
        </ScrollView>
      </View>
    </Background>
  );
}