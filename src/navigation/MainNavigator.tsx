import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { DrawerNavigator } from './DrawerNavigator';
import { TopRated } from '../components/HomeScreenComponents/TopRated/TopRated';
import ResortDetails from '../components/HomeScreenComponents/ResortDetails/ResortDetails';
import Logo from '../assets/images/AnantaLogo.svg';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RootStack = createStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="DrawerRoot"
        component={DrawerNavigator}
        options={{ gestureEnabled: false }}
      />
      <RootStack.Screen name="TopRated" component={TopRated} />
      <RootStack.Screen
        name="ResortDetails"

  component={ResortDetails}

        options={{
          headerShown: true,
          gestureEnabled: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black',
            height: Platform.OS === 'ios' ? 100 + insets.top : 56 + insets.top,
          },
          headerTintColor: '#D4AF37',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </RootStack.Navigator>
  );
};
