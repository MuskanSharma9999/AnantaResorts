import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { DrawerNavigator } from './DrawerNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="DrawerRoot"
        component={DrawerNavigator}
        options={{ gestureEnabled: false }}
      />
    </RootStack.Navigator>
  );
};