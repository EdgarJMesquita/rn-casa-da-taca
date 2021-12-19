import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { Fab } from '../../components/Fab';
import { PromptModal } from '../../components/PromptModal';
import { StackScreensProps } from '../../routes/auth.routes';
import { theme } from '../../global/theme';
import { Entypo } from '@expo/vector-icons';
import { TableCard } from '../../components/TableCard';
import { useOrders } from '../../hooks/useOrders';
import { TableProps } from '../../context/OrderContext';

export function Tables({navigation}:StackScreensProps){
  const [ isVisible, setVisible ] = useState(false);
  const { tables, createTable } = useOrders();
  const [ newTableName, setNewTableName ] = useState('');
  //console.log(tables.map(item=>item.name).includes("mesa 1"));
  //console.log(tables.map(item=>item.name));

  async function handleCreateTable() {
    if(!newTableName) return;
    if(tables.map(item=>item.name).includes(newTableName)) return;

    setVisible(false);

    const tableRef = await createTable(newTableName);

    if(!tableRef) return;

    navigation.navigate('TableDetails', { tableId: tableRef });
  }

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>
          Mesas
        </Text>
        <ScrollView style={{flex: 1, width: '100%'}}>
          {
            tables?.map((table,index)=>(
              <TableCard 
                table={table}
                action={()=>navigation.navigate('TableDetails', { tableId: table.id })}
                key={index}
              />
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
        setText={setNewTableName}
        text={newTableName}
      />
    </Background>
  );
}