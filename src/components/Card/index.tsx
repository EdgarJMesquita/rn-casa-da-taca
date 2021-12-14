import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Taca from '../../assets/taca.png';
import { theme } from '../../global/theme';
import { FontAwesome } from '@expo/vector-icons'; 
import { styles } from './styles';
import { FlavorSelect } from '../FlavorSelect';
import { RectButton } from 'react-native-gesture-handler';

type CardProps = {
  name: string;
}

export function Card({name}:CardProps){
  const [ size, setSize ] = useState<'250'|'330'>('250');
  const [ flavor, setFlavor ] = useState('');
  const [ secondFlavor, setSecondFlavor ] = useState('');
  const [ observation, setObservation ] = useState('');
  const [ isFlavorSelectVisible, setFlavorSelectVisible ] = useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.leftBar}></View>

      <View style={{width: '35%'}}>
        <Text style={styles.title}>{name}</Text>
        <Image source={Taca} style={{marginTop: 35, alignSelf: 'center'}}/>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Tamanho*</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={()=>setSize('250')} 
            style={[styles.button, { borderColor: size==='250'? theme.colors.primary: 'transparent' }]}
          >
            <Text style={styles.buttonTitle}>
              250 ml
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>setSize('330')}
            style={[styles.button, { borderColor: size==='330'? theme.colors.primary: 'transparent' }]}
          >
            <Text style={styles.buttonTitle}>
              330 ml
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, {marginTop: 10}]}>
          Sabor*
        </Text>
        <TouchableOpacity style={styles.select}>
          <Text style={styles.text}>
            {flavor? flavor : 'Escolha um sabor'}
          </Text>
          <FontAwesome name="caret-down" size={20} color={theme.colors.text} />
        </TouchableOpacity>

        { size==='330' &&
          <>
            <Text style={[styles.label, {marginTop: 10}]}>
              Sabor(opcional)
            </Text>
            <TouchableOpacity style={styles.select}>
              <Text style={styles.text}>
                {flavor? flavor : 'Escolha um sabor'}
              </Text>
              <FontAwesome name="caret-down" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </>
        }

        <Text style={[styles.label, {marginTop: 10}]}>
          Observação(opcional)
        </Text>
        <TextInput
          value={observation}
          onChangeText={setObservation}
          style={styles.textArea}
          multiline
        />

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.total}>
              R$ {'13.50'}
            </Text>
            <RectButton style={styles.submitButton}>
              <Text style={styles.submitButtonText}>
                Salvar
              </Text>
            </RectButton>
          </View>
        </View>
      </View>

      <FlavorSelect 
        isVisible={isFlavorSelectVisible}
        closeModal={()=>setFlavorSelectVisible(false)}
        data={[]}
        action={()=>1}
      />
    </View>
  );
}