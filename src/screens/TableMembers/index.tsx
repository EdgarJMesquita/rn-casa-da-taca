import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { Fab } from '../../components/Fab';
import { Member } from '../../components/Member';
import { styles } from './styles';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { PromptModal } from '../../components/PromptModal';
import { useOrders } from '../../hooks/useOrders';
import { TableMembersProps } from '../../routes/types';
import { BorderlessButton } from 'react-native-gesture-handler';

export function TableMembers({ route, navigation }:TableMembersProps){
  const tableId = route.params.tableId;
  const { tables } = useOrders();
  const [ newMember, setNewMember ] = useState('');
  const [ isVisible, setVisible ] = useState(false);
  const { addMember } = useOrders();

  const selectedTable = tables?.find(item=>item.id===tableId);

  async function handleAddMember(newMember:string){
    if(!newMember) return;
    const memberRef = await addMember(tableId, newMember);
    setVisible(false);
    
    if(!memberRef) return;
    
    navigation.navigate('MemberOrders',{ tableId, memberId: memberRef })
  }

  return (
    <Background>
      <View style={styles.tableLabel}>
        <BorderlessButton onPress={()=>navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={theme.colors.text} />
        </BorderlessButton>
        <Text style={styles.title}>
          Mesa {selectedTable?.name}
        </Text>
        <View style={{width: 20}} ></View>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Membros
        </Text>
        <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView style={{flex: 1, width: '100%'}}>
            {
              selectedTable?.members?.length?
                selectedTable.members.map((member, index)=>(
                  <Member
                    action={()=>navigation.navigate('MemberOrders',{ tableId: tableId, memberId: member.id })}
                    name={member.name} 
                    key={index}
                    member={member}
                  />
                ))
                :
                <View style={{height: 500, justifyContent: 'center'}}>
                  <Text style={styles.noMembersMessage}>
                    Esta mesa ainda não tem membros
                  </Text>
                </View>
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
        action={()=>handleAddMember(newMember)}
      />
    </Background>
  );
}