import React from 'react';
import { createContext, ReactNode, useEffect, useState } from "react";
import { onValue, ref, off, push } from "firebase/database";
import { database } from "../service/database";

export type OrderProps = {
  id: string;
  name: string;
  size: number;
  firstFlavor: string;
  secondFlavor: string;
  observation: string;
  price: string;
}

type MemberProps = {
  id: string;
  name: string;
  orders: OrderProps[];
}

export type TableProps = {
  name: string;
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
}

type OrdersContextProps = {
  tables: TableProps[];
  createTable: (tableName: string)=>Promise<string|null>;
  addMember: (tableId: string, memberName: string)=>Promise<string|null>;
  addOrder: (tableId: string, memberId: string, order: NewOrderProps)=>Promise<string|null>;
  deleteOrder: (tableId: string, memberId: string, orderId:string)=>void;
}

type DatabaseOrderProps = {
  [key:string]: {
    name: string;
    size: number;
    firstFlavor: string;
    secondFlavor: string;
    observation: string;
    price: string;
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
  members?:  DatabaseMembersProps;
}

type OrderDatabaseProps = {
  [key:string]: DatabaseTableProps;
}

export const OrdersContext = createContext({}as OrdersContextProps);

export function OrdersContextProvider({children}:OrdersContextProviderProps){
  const [ tables, setTables ] = useState<TableProps[]>([]);

  async function createTable(tableName: string) {
    try {
      const tableRef = ref(database, 'tables');
      const response = await push(tableRef, { name: tableName })
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

  useEffect(()=>{
    const tableRef = ref(database, 'tables');
    onValue(tableRef,(dataSnapshot)=>{
      if(!dataSnapshot.exists()) return;
      const databaseData:OrderDatabaseProps = dataSnapshot.val();

      const data = Object.entries(databaseData)
      .map(([tableKey, table])=>({
          id: tableKey,
          name: table.name,
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
  },[]);

  return(
    <OrdersContext.Provider value={{
      tables,
      createTable,
      addMember,
      addOrder,
      deleteOrder
    }}>
      {children}
    </OrdersContext.Provider>
  );
}