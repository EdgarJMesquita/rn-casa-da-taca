import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login } from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../global/theme';
import { Header } from '../components/Header';
import { Menu } from '../screens/Menu';
import { CustomDrawer } from '../components/CustomDrawer';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { drawerItemStyles } from './drawerItemStyles';
import { AttendanceRoutes } from './attendance.routes';
import { Kitchen } from '../screens/Kitchen';
import { Cashier } from '../screens/Cashier';
import { useOrders } from '../hooks/useOrders';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerRoutes(){
  const { user } = useOrders();
  return(
    <Drawer.Navigator
      screenOptions={{
        header: (props)=><Header {...props} />,
        overlayColor: theme.colors.black100
      }}
      drawerContent={(props)=><CustomDrawer {...props} email={user?.email} />}
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
        name="Attendance"
        component={AttendanceRoutes}
        options={{
          drawerIcon: (props)=><MaterialCommunityIcons name="table-furniture" color="#FFFFFF" size={22} />,
          title: 'Mesas',
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
          drawerItemStyle: {
            width: 250,
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 5,
            display: user?.uid==='4s2VROZeAdd5HlJFj18imS4i7hh2'?'flex':'none'
          }
          
        }}
      />

      <Drawer.Screen 
        name="Cashier"
        component={Cashier}
        options={{
          drawerIcon: (props)=><MaterialIcons name="attach-money" color="#FFFFFF" size={22}/>,
          title: 'Caixa',
          ...drawerItemStyles,
          drawerItemStyle: {
            width: 250,
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 5,
            display: user?.uid==='4s2VROZeAdd5HlJFj18imS4i7hh2'?'flex':'none'
          }
        }}
      />
     
    </Drawer.Navigator>
  );
}

export function AuthRoutes(){
  const { user } = useOrders();
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.black80
        }
      }}
    >
      {
        user?.uid?(
          <Stack.Screen 
            name="DrawerRoutes"
            component={DrawerRoutes}
          />

        ):(
          <Stack.Screen 
            name="Login"
            component={Login}
          />
        )
      }
    </Stack.Navigator>
  );
}