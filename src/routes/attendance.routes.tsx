import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../global/theme';
import { TableDetails } from '../screens/TableDetails';
import { MemberDetails } from '../screens/MemberDetails';
import { Tables } from '../screens/Tables';
import { CreateOrder } from '../screens/CreateOrder';

type RootParamsList = {
  Login: undefined;
  Menu: undefined;
  TableDetails: { table: string };
  MemberDetails: { table: string, member: string };
}

export type StackScreensProps = NativeStackScreenProps<RootParamsList>;
export type TableDetailsProps = NativeStackScreenProps<RootParamsList,'TableDetails'>;
export type MemberDetailsProps = NativeStackScreenProps<RootParamsList,'MemberDetails'>;

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
        name="TableDetails"
        component={TableDetails}
        options={{animation: 'slide_from_bottom'}}
      />

      <Stack.Screen
        name="MemberDetails"
        component={MemberDetails}
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