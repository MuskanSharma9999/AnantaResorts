import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { DrawerNavigator } from './DrawerNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="RootTabs"
        component={DrawerNavigator}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
