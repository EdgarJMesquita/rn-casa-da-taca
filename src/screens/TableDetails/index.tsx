import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { Fab } from '../../components/Fab';
import { Member } from '../../components/Member';
import { TableDetailsProps } from '../../routes/auth.routes';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { PromptModal } from '../../components/PromptModal';

export function TableDetails({ route, navigation }:TableDetailsProps){
  const table = route.params.table;
  const [ members, setMembers ] = useState<string[]>(['Edgar', 'Paty', 'Val']);
  const [ newMember, setNewMember ] = useState('');
  const [ isVisible, setVisible ] = useState(false);

  async function addMember() {
    if(!newMember || members.includes(newMember)) return;
    setVisible(false);
    setMembers(prev=>[...prev, newMember]);
    setNewMember('');
  }

  return (
    <Background>
      <View style={styles.tableLabel}>
        <Text style={styles.title}>
          Mesa {table}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Membros
        </Text>
        <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView style={{flex: 1, width: '100%'}}>
            {members?
              members.map((member, index)=>(
                <Member
                  action={()=>navigation.navigate('MemberDetails',{ table, member: member })}
                  name={member} 
                  key={index}
                />
              ))
              :
              <Text style={styles.noMembersMessage}>
                Esta mesa ainda não tem membros
              </Text>
            }
          </ScrollView>
        </View>
      </View>
      <Fab
        onPress={()=>setVisible(true)}
        icon={
          <FontAwesome 
            name="user-plus" 
            size={20} 
            color={theme.colors.text} 
            style={{marginLeft: 3, marginBottom: 2.2}}
          />
        }
      />
      <PromptModal 
        isVisible={isVisible}
        closeModal={()=>setVisible(false)}
        label="Digite o nome do membro:"
        text={newMember}
        setText={setNewMember}
        action={addMember}
      />
    </Background>
  );
}