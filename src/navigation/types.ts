// src/navigation/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Otp: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
  Home: undefined;
  Booking: undefined;
  Services: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
};