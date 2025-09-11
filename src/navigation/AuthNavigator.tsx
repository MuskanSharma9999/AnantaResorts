import React, { use } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import SplashScreen from '../components/auth/splash/SplashScreen';
import LoginScreen from '../components/auth/Login/LoginScreen';
import OnboardingScreen from '../components/auth/onboarding/OnboardingScreen';
import Logo from '../assets/images/AnantaLogo.svg';

import OtpScreen from '../components/auth/otp/OtpScreen';
import SignupScreen from '../components/auth/SignupScreen/SignupScreen';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TopRated } from '../components/HomeScreenComponents/TopRated/TopRated';
const Stack = createStackNavigator<RootStackParamList>();

export const AuthNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ gestureEnabled: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black',
            height: Platform.OS === 'ios' ? 56 + insets.top : 56 + insets.top,
          },
          headerTintColor: '#D4AF37',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black',
            height: Platform.OS === 'ios' ? 56 + insets.top : 56 + insets.top,
          },
          headerTintColor: '#D4AF37',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black',
            height: Platform.OS === 'ios' ? 56 + insets.top : 56 + insets.top,
          },
          headerTintColor: '#D4AF37',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="TopRated"
        component={TopRated}
        options={{
          gestureEnabled: true,
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black',
            height: Platform.OS === 'ios' ? 56 + insets.top : 56 + insets.top,
          },
          headerTintColor: '#D4AF37',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack.Navigator>
  );
};
