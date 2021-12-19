import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../global/theme';
import { TableMembers } from '../screens/TableMembers';
import { MemberOrders } from '../screens/MemberOrders';
import { Tables } from '../screens/Tables';
import { CreateOrder } from '../screens/CreateOrder';

const Stack = createNativeStackNavigator();

export function AttendanceRoutes(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.black80
        },
      }}
    >
      <Stack.Screen 
        name="Tables"
        component={Tables}
        options={{animation: 'slide_from_bottom'}}
      />
      
      <Stack.Screen
        name="TableMembers"
        component={TableMembers}
        options={{animation: 'slide_from_bottom'}}
      />

      <Stack.Screen
        name="MemberOrders"
        component={MemberOrders}
        options={{animation: 'slide_from_bottom'}}
      />

      <Stack.Screen
        name="CreateOrder"
        component={CreateOrder}
        options={{animation: 'slide_from_bottom'}}
      />

    </Stack.Navigator>
  );
}