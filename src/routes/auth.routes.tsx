import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login } from '../screens/Login';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../global/theme';
import { Header } from '../components/Header';
import { Menu } from '../screens/Menu';
import { CustomDrawer } from '../components/CustomDrawer';
import { Entypo } from '@expo/vector-icons';
import { drawerItemStyles } from './drawerItemStyles';
import { TableDetails } from '../screens/TableDetails';
import { MemberDetails } from '../screens/MemberDetails';

type RootParamsList = {
  Login: undefined;
  Menu: undefined;
  TableDetails: { table: string };
  MemberDetails: { table: string, member: string };
}

export type StackScreensProps = NativeStackScreenProps<RootParamsList>;
export type TableDetailsProps = NativeStackScreenProps<RootParamsList,'TableDetails'>;
export type MemberDetailsProps = NativeStackScreenProps<RootParamsList,'MemberDetails'>;

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerRoutes(){
  return(
    <Drawer.Navigator
      screenOptions={{
        header: (props)=><Header {...props} />
      }}
      drawerContent={CustomDrawer}
    >
      <Drawer.Screen 
        name="Menu"
        component={Menu}
        options={{
          drawerIcon: (props)=><Entypo name="home" color="#FFFFFF" size={22} />,
          title: 'Menu',
          ...drawerItemStyles,

        }}
      />
      <Drawer.Screen
        name="TableDetails"
        component={TableDetails}
        options={{
          drawerItemStyle: {
            display: 'none'
          }
        }}
      />
      <Drawer.Screen
        name="MemberDetails"
        component={MemberDetails}
        options={{
          drawerItemStyle: {
            display: 'none'
          }
        }}
      />
    </Drawer.Navigator>
  );
}

export function AuthRoutes(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.black80
        }
      }}
    >
      <Stack.Screen 
        name="DrawerRoutes"
        component={DrawerRoutes}
      />
      <Stack.Screen 
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
}