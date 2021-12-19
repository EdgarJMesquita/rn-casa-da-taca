import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login } from '../screens/Login';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../global/theme';
import { Header } from '../components/Header';
import { Menu } from '../screens/Menu';
import { CustomDrawer } from '../components/CustomDrawer';
import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { drawerItemStyles } from './drawerItemStyles';
import { AttendanceRoutes } from './attendance.routes';
import { MenuProps } from '../context/MenuContext';
import { Kitchen } from '../screens/Kitchen';

type RootParamsList = {
  Login: undefined;
  Menu: undefined;
  TableDetails: { tableId: string };
  MemberDetails: { tableId: string, memberId: string };
  CreateOrder: { tableId: string, memberId: string, selectedMenuItem: MenuProps|undefined };
}

export type StackScreensProps = NativeStackScreenProps<RootParamsList>;
export type TableDetailsProps = NativeStackScreenProps<RootParamsList,'TableDetails'>;
export type MemberDetailsProps = NativeStackScreenProps<RootParamsList,'MemberDetails'>;
export type CreateOrderProps = NativeStackScreenProps<RootParamsList,'CreateOrder'>;

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerRoutes(){
  return(
    <Drawer.Navigator
      screenOptions={{
        header: (props)=><Header {...props} />,
        overlayColor: theme.colors.black100
      }}
      drawerContent={CustomDrawer}
    >
      <Drawer.Screen 
        name="Attendance"
        component={AttendanceRoutes}
        options={{
          drawerIcon: (props)=><MaterialCommunityIcons name="table-furniture" color="#FFFFFF" size={22} />,
          title: 'Mesas',
          ...drawerItemStyles,
        }}
      />

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
        name="Kitchen"
        component={Kitchen}
        options={{
          drawerIcon: (props)=><MaterialIcons name="kitchen" color="#FFFFFF" size={22} />,
          title: 'Cozinha',
          ...drawerItemStyles,
        }}
      />
      <Drawer.Screen 
        name="Cashier"
        component={Kitchen}
        options={{
          drawerIcon: (props)=><FontAwesome name="money" color="#FFFFFF" size={22} />,
          title: 'Caixa',
          ...drawerItemStyles,
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