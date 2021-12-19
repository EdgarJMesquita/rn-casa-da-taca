import React, { useState } from 'react';
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

export function Tables({navigation}:StackScreensProps){
  const [ isVisible, setVisible ] = useState(false);
  const { tables, createTable } = useOrders();
  const [ newTableName, setNewTableName ] = useState('');

  async function handleCreateTable() {
    if(!newTableName) return;
    if(tables?.map(item=>item.name).includes(newTableName)) return;

    setVisible(false);

    const tableRef = await createTable(newTableName);

    if(!tableRef) return;

    navigation.navigate('TableMembers', { tableId: tableRef });
  }

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>
          Mesas
        </Text>
        <ScrollView style={{flex: 1, width: '100%'}}>
          { tables?
            tables.length>0?
            tables.map((table,index)=>(
              <TableCard 
                table={table}
                action={()=>navigation.navigate('TableMembers', { tableId: table.id })}
                key={index}
              />
            ))
            :
            <View style={{height: 500, justifyContent: 'center'}}>
              <Text style={styles.noMembersMessage}>
                Ainda não há mesas ativas.
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