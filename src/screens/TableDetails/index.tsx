import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { Fab } from '../../components/Fab';
import { Member } from '../../components/Member';
import { TableDetailsProps } from '../../routes/auth.routes';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { PromptModal } from '../../components/PromptModal';
import { useOrders } from '../../hooks/useOrders';

export function TableDetails({ route, navigation }:TableDetailsProps){
  const tableId = route.params.tableId;
  const { tables } = useOrders();
  const [ newMember, setNewMember ] = useState('');
  const [ isVisible, setVisible ] = useState(false);
  const { addMember } = useOrders();

  const selectedTable = tables.find(item=>item.id===tableId);

  async function handleAddMember(){
    if(!newMember) return;
    const memberRef = await addMember(tableId, newMember);
    if(!memberRef) return;

    navigation.navigate('MemberDetails',{ tableId, memberId: memberRef })
  }

  return (
    <Background>
      <View style={styles.tableLabel}>
        <Text style={styles.title}>
          Mesa {selectedTable?.name}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Membros
        </Text>
        <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView style={{flex: 1, width: '100%'}}>
            {
              selectedTable?
                selectedTable?.members?
                  selectedTable.members.map((member, index)=>(
                    <Member
                      action={()=>navigation.navigate('MemberDetails',{ tableId: tableId, memberId: member.id })}
                      name={member.name} 
                      key={index}
                    />
                  ))
                  :
                  <Text style={styles.noMembersMessage}>
                    Esta mesa ainda não tem membros
                  </Text>
                : <ActivityIndicator color={theme.colors.primary} size={20} />
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
        action={handleAddMember}
      />
    </Background>
  );
}