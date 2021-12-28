import React from 'react';
import { createContext, ReactNode, useEffect, useState } from "react";
import { onValue, ref, off, push, update, set, remove, onChildAdded, get,  } from "firebase/database";
import { database } from "../service/database";
import * as Notifications from 'expo-notifications';
import { User } from '../screens/Login';
import { registerForPushNotificationsAsync, sendNotificationToAttendant, sendNotificationToKitchen, updateMobileKey, uploadMobileKey } from '../utils/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subscription } from 'expo-modules-core';

export type OrderProps = {
  id: string;
  name: string;
  size: number;
  firstFlavor: string;
  secondFlavor: string;
  observation: string;
  price: string;
  type: 'cup'|'ship'|'drink';
  status: 'new'|'done'|'paid'|'cancelled';
}

export type MemberProps = {
  id: string;
  name: string;
  orders: OrderProps[];
}

export type TableProps = {
  name: string;
  attendant: string;
  id: string;
  members?: MemberProps[];
  closed_at?: string|null;
}

type OrdersContextProviderProps = {
  children: ReactNode;
}

type NewOrderProps = {
  name: string;
  size?: number;
  firstFlavor?: string;
  secondFlavor?: string;
  observation?: string;
  price: string;
  type: 'cup'|'ship'|'drink'
}

type OrderDatabaseProps = {
  [key:string]: {
    name: string;
    attendant: string;
    closed_at?: string;
    members?: {
      [key:string]: {
        name: string;
        orders?: {
          [key:string]: {
            name: string;
            size: number;
            firstFlavor: string;
            secondFlavor: string;
            observation: string;
            price: string;
            type: 'cup'|'ship'|'drink';
            status: 'new'|'done'|'paid'|'cancelled';
          }
        };
      }
    };
  };
}

type OrdersContextProps = {
  user: User|null;
  tables: TableProps[]|undefined;
  setUser: (user:User)=>void;
  createTable: (tableName: string)=>Promise<string|null>;
  addMember: (tableId: string, memberName: string)=>Promise<string|null>;
  addOrder: (tableId: string, memberId: string, order: NewOrderProps)=>Promise<string|null>;
  updateOrder: (tableId: string, memberId: string, orderId:string, status: 'done'|'paid'|'cancelled')=>Promise<void>;
  closeDay: (report: TableProps[])=>Promise<boolean>;
  fetchReport: (year: number, month: number, day: number)=>Promise<TableProps[]|[]>;
  closeTable: (tableId: string)=>Promise<void>;
  editOrder: (tableId: string, memberId: string, order: OrderProps) => Promise<void>;
  deleteOrder: (orderId: string)=>void;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const OrdersContext = createContext({} as OrdersContextProps);

export function OrdersContextProvider({children}:OrdersContextProviderProps){
  const [ tables, setTables ] = useState<TableProps[]|undefined>();
  const [ user, setUser ] = useState<User|null>(null);

  async function createTable(tableName: string) {
    if(!user) return null;
    try {
      const tableRef = ref(database, 'tables');
      const response = await push(tableRef, { name: tableName, attendant: user.uid })
      return response.key;

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function addMember(tableId: string, memberName: string) {
    try {
      const memberRef = ref(database, `tables/${tableId}/members`);
      const response = await push(memberRef, { name: memberName })
      return response.key;

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function editOrder(tableId: string, memberId: string, order: OrderProps) {
    try {
      const { id, ...rest } = order;
      const orderRef = ref(database, `tables/${tableId}/members/${memberId}/orders/${id}`);
      await update(orderRef, {...rest});

      const table = tables?.find(item=>item.id===tableId)?.name; 
      const member = tables?.find(item=>item.id===tableId)?.members?.find(item=>item.id===memberId)?.name;
      sendNotificationToKitchen({
        title: 'Pedido atualizado',
        body: `Uma ${order.type==='cup'?'Taça':'Barca'} ${order.name} Sabor ${order.firstFlavor} ${order.secondFlavor? 'e '+order.secondFlavor:''} ${order.size} ml \nMesa: ${table}\nCliente: ${member}`
      });

    } catch (error) {
      console.log(error);
    }
  }

  async function addOrder(tableId: string, memberId: string, order: NewOrderProps) {
    try {
      const orderRef = ref(database, `tables/${tableId}/members/${memberId}/orders`);
      const { key } = await push(orderRef, order);

      const table = tables?.find(item=>item.id===tableId)?.name; 
      const member = tables?.find(item=>item.id===tableId)?.members?.find(item=>item.id===memberId)?.name;

      order.type!=='drink' && sendNotificationToKitchen({
        title: 'Novo pedido',
        body: `Uma ${order.type==='cup'?'Taça':'Barca'} ${order.name} Sabor ${order.firstFlavor} ${order.secondFlavor? 'e '+order.secondFlavor:''} ${order.size} ml \nMesa: ${table} \nCliente: ${member}`
      });

      return key;
      
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function updateOrder(tableId: string, memberId: string, orderId:string, status: string) {
    try {
      const orderRef = ref(database, `tables/${tableId}/members/${memberId}/orders/${orderId}`);
      await update(orderRef, { status });
      console.log('Atualizado com sucesso para '+status);

      const order = tables?.find(item=>item.id===tableId)?.members?.find(item=>item.id===memberId)?.orders.find(item=>item.id===orderId);
      status==='done' && sendNotificationToAttendant({
        title: 'Pedido Pronto',
        body: `Mesa ${tables?.find(item=>item.id===tableId)?.name} \n Cliente ${tables?.find(item=>item.id===tableId)?.members?.find(item=>item.id===memberId)?.name} \n Pedido ${order?.type==='cup'?'Taça':'Barca'} ${order?.name} Sabor ${order?.firstFlavor} ${order?.secondFlavor? 'e '+order.secondFlavor:''} ${order?.size} ml`
      });

    } catch (error) {
      console.log(error);
    }
  }

  async function closeDay(report: TableProps[]) {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth()+1;
    const year = currentDate.getFullYear();
    
    try {
      console.log(report);
      const historyRef = ref(
        database, 
        `history/${year}/${month}/${day}`
      );
      await set(historyRef, report);

      const tableRef = ref(database, 'tables');
      await remove(tableRef);
      
      return true;
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async function fetchReport(year: number, month: number, day: number) {
    try {
      const historyRef = ref(
        database, 
        `history/${String(year).padStart(2,'0')}/${String(month).padStart(2,'0')}/${String(day).padStart(2,'0')}`
      );
      const store = await get(historyRef);
      const history:TableProps[] = store.val();

      if(history){
        return history;
      }
      return [];

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async function closeTable(tableId:string) {
    try {
      const tableRef = ref(database, `tables/${tableId}`)
      update(tableRef, {
        closed_at: new Date() 
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteOrder(orderId: string) {
    let tableId = '';
    let memberId = '';

    tables?.forEach(table=>{
      table.members?.forEach(member=>{
        member.orders?.forEach(order=>{
          if(order.id===orderId){
            tableId = table.id;
            memberId = member.id;
          }
        })
      })
    })
    
    try {
      const orderRef = ref(database, `tables/${tableId}/members/${memberId}/orders/${orderId}`);
      //console.log(`tables/${tableId}/members/${memberId}/orders${orderId}`);
      await remove(orderRef);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!user) return;
    const tableRef = ref(database, 'tables');
    onValue(tableRef,(dataSnapshot)=>{
      if(!dataSnapshot.exists()){
        setTables([]);
        return;
      } 
      const databaseData:OrderDatabaseProps = dataSnapshot.val();

      const data = Object.entries(databaseData)
      .map(([tableKey, table])=>({
          id: tableKey,
          name: table.name,
          attendant: table.attendant,
          closed_at: table.closed_at||null,
          members: table.members? 
            Object.entries(table.members)
            .map(([memberKey,member])=>({
              id: memberKey,
              name: member.name,
              orders: member.orders?
                Object.entries(member.orders)
                .map(([orderKey, order])=>({
                  id: orderKey, 
                  ...order
                })):[]
            })):[]
      }));
      setTables(data);
    });
    return()=>{
      off(tableRef);
    }
  },[user]);

 /*  useEffect(()=>{
    if(!user) return;
    const subscription = Notifications.addPushTokenListener(async({data})=>{
      //const role = user?.uid==='WlbQiG4RCSeKrNkqSpMvhZWlByE2' || user?.uid==='4s2VROZeAdd5HlJFj18imS4i7hh2'? 'admin':'attendant';
      const tokenId = await AsyncStorage.getItem('@TOKEN_ID');
      if(!tokenId) return;

      updateMobileKey(tokenId, data);
    });
    return()=>{
      subscription.remove();
    }
  },[user]); */

  useEffect(()=>{
    let subscription:Subscription|null = null;

    (async()=>{
      if(!user) return;
      const store = await AsyncStorage.getItem('@TOKEN_ID');
      if(store) {
        subscription = Notifications.addPushTokenListener(async({data})=>{
          const tokenId = await AsyncStorage.getItem('@TOKEN_ID');
          if(!tokenId) return;
          await updateMobileKey(tokenId, data);
        });

      } else {
        /* try {
          const token = await registerForPushNotificationsAsync();
          if(!token) return console.log('Missing token.');
          const role = user?.uid==='WlbQiG4RCSeKrNkqSpMvhZWlByE2' || user?.uid==='4s2VROZeAdd5HlJFj18imS4i7hh2'? 'admin':'attendant';
          const key = await uploadMobileKey(token, role);
          if(!key) return;
          await AsyncStorage.setItem('@TOKEN_ID', key);
  
        } catch (error) {
          console.log(error);
        } */
      }
    })();
    return()=>{
      subscription?.remove();
    }
  },[user]);
  
  //AsyncStorage.removeItem('@TOKEN_ID');
  //AsyncStorage.getItem('@TOKEN_ID').then(res=>console.log(res));
  
  return(
    <OrdersContext.Provider value={{
      user,
      tables,
      closeTable,
      setUser,
      createTable,
      addMember,
      addOrder,
      editOrder,
      updateOrder,
      closeDay,
      fetchReport,
      deleteOrder
    }}>
      {children}
    </OrdersContext.Provider>
  );
}