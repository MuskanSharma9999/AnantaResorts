import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from './types';
import { TabNavigator } from './TabNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000',
        },
        drawerActiveTintColor: '#D4AF37',
        drawerInactiveTintColor: '#fff',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ title: 'Home' }}
      />
    </Drawer.Navigator>
  );
};