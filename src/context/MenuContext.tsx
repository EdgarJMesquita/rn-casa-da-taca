import React from 'react';
import { createContext, ReactNode, useEffect, useState } from "react";
import { onValue, ref, off, get } from "firebase/database";
import { database } from "../service/database";

export type MenuProps = {
  name: string;
  type: 'cup'|'ship'|'drink';
  sizes: number[];
  prices: number[];
}
 
type MenuContextProviderProps = {
  children: ReactNode;
}

type MenuContext = {
  menu: MenuProps[];
  flavors: string[];
  getMenu: ()=>Promise<MenuProps[]>;
  getFlavours: ()=>Promise<string[]>;
}

export const MenuContext = createContext({}as MenuContext);

export function MenuContextProvider({children}:MenuContextProviderProps){
  const [ menu, setMenu ] = useState<MenuProps[]>([]);
  const [ flavors, setFlavors ] = useState<string[]>([]);

  async function getMenu() {
    try {
      const menuRef = ref(database,'menu');
      const response = await get(menuRef);
      const data = response.val();
      if(data){
        return data; 
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getFlavours() {
    try {
      const flavorsRef = ref(database,'flavors');
      const response = await get(flavorsRef);
      const data = response.val();
      if(data){
        return data; 
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* useEffect(()=>{
    const menuRef = ref(database,'menu');
    onValue(menuRef,(dataSnapshot)=>{
      if(!dataSnapshot.exists()) return;
      const data = dataSnapshot.val();
      setMenu(data);
    });
    return()=>{
      off(menuRef);
    }
  },[]); */
  /* useEffect(()=>{
    const flavorsRef = ref(database,'flavors');
    onValue(flavorsRef,(dataSnapshot)=>{
      if(!dataSnapshot.exists()) return;
      const data = dataSnapshot.val();
      setFlavors(data);
    });
    return()=>{
      off(flavorsRef);
    }
  },[]); */

  return(
    <MenuContext.Provider value={{
      getMenu,
      getFlavours,
      menu,
      flavors
    }}>
      {children}
    </MenuContext.Provider>
  );
}