import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { Fab } from '../../components/Fab';
import { PromptModal } from '../../components/PromptModal';
import { theme } from '../../global/theme';
import { Entypo } from '@expo/vector-icons';
import { TableCard } from '../../components/TableCard';
import { useOrders } from '../../hooks/useOrders';
import { StackScreensProps } from '../../routes/types';
import { TableProps } from '../../context/OrderContext';

export function Tables({navigation}:StackScreensProps){
  const [ isVisible, setVisible ] = useState(false);
  const { user, tables, createTable } = useOrders();
  const [ newTableName, setNewTableName ] = useState('');
  const [ filteredTables, setFilteredTables ] = useState<TableProps[]>();
  const isAdmin = user?.uid==='WlbQiG4RCSeKrNkqSpMvhZWlByE2' || user?.uid==='4s2VROZeAdd5HlJFj18imS4i7hh2';

  async function handleCreateTable() {
    if(!newTableName) return;
    if(tables?.filter(item=>!item.closed_at).map(item=>item.name).includes(newTableName)) return;
    
    setVisible(false);
    
    const tableRef = await createTable(newTableName);
    
    if(!tableRef) return;
    
    setNewTableName('');
    navigation.navigate('TableMembers', { tableId: tableRef });
  }
  
  useEffect(()=>{
    const _filteredTables = tables?.filter(item=>item.attendant===user?.uid || isAdmin).filter(item=>!item.closed_at);
    setFilteredTables(_filteredTables);
  },[tables])

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>
          Mesas
        </Text>
        <ScrollView style={{flex: 1, width: '100%'}}>
          { filteredTables?
            filteredTables.length>0?
            filteredTables
            .map((table,index)=>(
              <TableCard 
                table={table}
                action={()=>navigation.navigate('TableMembers', { tableId: table.id })}
                key={index}
              />
            ))
            :
            <View style={{height: 500, justifyContent: 'center'}}>
              <Text style={styles.noMembersMessage}>
                Ainda n??o h?? mesas ativas.
              </Text>
            </View>
            :
            <View style={{height: 500, justifyContent: 'center'}}>
              <ActivityIndicator size={30} color={theme.colors.primary} />
            </View>
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
        setText={setNewTableName}
        text={newTableName}
      />
    </Background>
  );
}