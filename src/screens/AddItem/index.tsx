import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export function AddItem(){
  return (
    <View style={styles.container}>
       <FlavorSelect 
        isVisible={isFlavorSelectVisible}
        closeModal={()=>setFlavorSelectVisible(false)}
        data={data.map(item=>item.name)}
        action={()=>1}
      />
      <MenuSelect 
        isVisible={isMenuVisible}
        closeModal={()=>setMenuVisible(false)}
        data={data.map(item=>item.name)}
        addSelectedItem={addSelectedItem}
      />
    </View>
  );
}