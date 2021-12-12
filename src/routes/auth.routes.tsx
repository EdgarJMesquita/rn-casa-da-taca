import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login } from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../global/theme';
import { Header } from '../components/Header';
import { Menu } from '../screens/Menu';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerRoutes(){
  return(
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen 
        name="Menu"
        component={Menu}
      />
    </Drawer.Navigator>
  );
}

export function AuthRoutes(){
  return(
    <>
      <Header />
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
    </>
  );
}