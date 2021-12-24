import React from 'react';
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import { Background } from '../../components/Background';
import Lisboa from '../../assets/lisboa.png';
import Bogota from '../../assets/bogota.jpg';
import Helsinki from '../../assets/helsinki.jpg';
import DenverCup from '../../assets/denver_cup.jpeg';
import Denver from '../../assets/denver.jpeg';
import EstocolmoCup from '../../assets/estocolmo_cup.jpeg';
import LisboaCup from '../../assets/lisboa_cup.jpeg';
import ManilaCup from '../../assets/manila_cup.jpeg';
import Manila from '../../assets/manila.jpeg';
import NairobiCup from '../../assets/nairobi_cup.jpeg';
import Nairobi from '../../assets/nairobi.jpeg';
import ProfessorCup from '../../assets/professor_cup.jpeg';
import Professor from '../../assets/professor.jpeg';
import RioCup from '../../assets/rio_cup.jpeg';
import Rio from '../../assets/rio.jpeg';
import SierraCup from '../../assets/sierra_cup.jpeg';
import TokyoCup from '../../assets/tokyo_cup.jpeg';
import Tokyo from '../../assets/tokyo.jpeg';

import { styles } from './styles';


const data = [
  {
    source: Professor,
    name: 'Professor'
  },
  {
    source: ProfessorCup,
    name: 'Professor'
  },
  {
    source: Lisboa,
    name: 'Lisboa'
  },
  {
    source: LisboaCup,
    name: 'Lisboa'
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
    source: ManilaCup,
    name: 'Manila'
  },
  {
    source: Denver,
    name: 'Denver'
  },
  {
    source: DenverCup,
    name: 'Denver'
  },
  {
    source: EstocolmoCup,
    name: 'Estocolmo'
  },
  {
    source: Nairobi,
    name: 'Nairóbi'
  },
  {
    source: NairobiCup,
    name: 'Nairóbi'
  },
  {
    source: Rio,
    name: 'Rio'
  },
  {
    source: RioCup,
    name: 'Rio'
  },
  {
    source: SierraCup,
    name: 'Sierra'
  },
  {
    source: Tokyo,
    name: 'Tokyo'
  },
  {
    source: TokyoCup,
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