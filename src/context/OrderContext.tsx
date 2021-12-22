import React from 'react';
import { createContext, ReactNode, useEffect, useState } from "react";
import { onValue, ref, off, push, update, set, remove, onChildAdded, get } from "firebase/database";
import { database } from "../service/database";
import * as Notifications from 'expo-notifications';
import { User } from '../screens/Login';

export type OrderProps = {
  id: string;
  name: string;
  size: number;
  firstFlavor: string;
  secondFlavor: string;
  observation: string;
  price: string;
  type: 'cup'|'ship'|'drink';
  status?: 'done'|'paid';
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

type OrdersContextProps = {
  user: User|undefined;
  tables: TableProps[]|undefined;
  setUser: (user:User)=>void;
  createTable: (tableName: string)=>Promise<string|null>;
  addMember: (tableId: string, memberName: string)=>Promise<string|null>;
  addOrder: (tableId: string, memberId: string, order: NewOrderProps)=>Promise<string|null>;
  deleteOrder: (tableId: string, memberId: string, orderId:string)=>void;
  updateOrder: (tableId: string, memberId: string, orderId:string, status: 'done'|'paid')=>Promise<void>;
  closeDay: (report: OrderProps[])=>Promise<boolean>;
  fetchReport: (year: number, month: number, day: number)=>Promise<OrderProps[]|null>;
}

type DatabaseOrderProps = {
  [key:string]: {
    name: string;
    size: number;
    firstFlavor: string;
    secondFlavor: string;
    observation: string;
    price: string;
    type: 'cup'|'ship'|'drink';
    status?: 'done'|'paid';
  }
}

type DatabaseMembersProps = {
  [key:string]: {
    name: string;
    orders?: DatabaseOrderProps;
  }
}

type DatabaseTableProps = {
  name: string;
  attendant: string;
  members?:  DatabaseMembersProps;
}

type OrderDatabaseProps = {
  [key:string]: DatabaseTableProps;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const OrdersContext = createContext({}as OrdersContextProps);

export function OrdersContextProvider({children}:OrdersContextProviderProps){
  const [ tables, setTables ] = useState<TableProps[]|undefined>();
  const [ user, setUser ] = useState<User>();

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

  async function addOrder(tableId: string, memberId: string, order: NewOrderProps) {
    try {
      const orderRef = ref(database, `tables/${tableId}/members/${memberId}/orders`);
      const response = await push(orderRef, order);
      return response.key;
      
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function deleteOrder(tableId: string, memberId: string, orderId:string) {
    console.log({tableId, memberId, orderId})
  }

  async function updateOrder(tableId: string, memberId: string, orderId:string, status: string) {
    try {
      const orderRef = ref(database, `tables/${tableId}/members/${memberId}/orders/${orderId}`);
      await update(orderRef, { status });
      console.log('Atualizado com sucesso para '+status);

    } catch (error) {
      console.log(error);
    }
  }

  async function closeDay(report: OrderProps[]) {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth()+1;
    const year = currentDate.getFullYear();
    
    try {
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
      const history:OrderProps[] = store.val();

      if(history){
        return history;
      }
      return null;

    } catch (error) {
      console.log(error);
      return null;
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

  useEffect(()=>{
    if(!user) return;

    const tablesRef = ref(database, 'tables')
    onChildAdded(tablesRef,(databaseSnapshot)=>{
      if(!databaseSnapshot.exists()) return;

      const newOrders:OrderProps[] = [];

      tables?.forEach(table=>{
        table.members?.forEach(member=>{
          member.orders?.forEach(order=>{
            if(!order.status){
              newOrders.push(order);
            }
          })
        })
      });

      Notifications.scheduleNotificationAsync({
        content: {
          title: `${newOrders?.length} Novos pedidos`,
          body: `Pedido ${newOrders[0]?.name}.`
        },
        trigger: {
          seconds: 1
        }
      })
    })
    return()=>{
      off(tablesRef);
    }
  },[user]);

  return(
    <OrdersContext.Provider value={{
      user,
      tables,
      setUser,
      createTable,
      addMember,
      addOrder,
      updateOrder,
      deleteOrder,
      closeDay,
      fetchReport
    }}>
      {children}
    </OrdersContext.Provider>
  );
}