// src/navigation/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Otp: undefined;
  Signup: undefined;
  DrawerRoot: undefined;
};

export type TabParamList = {
  Home: undefined;
  Booking: undefined;
  Services: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  Setting: undefined;
  Logout: undefined;
};
