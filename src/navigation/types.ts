// src/navigation/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Otp: undefined;
  Signup: undefined;
  DrawerRoot: undefined;
  TopRated: undefined;
  ResortDetails: undefined;
};

export type TabParamList = {
  Home: undefined;
  JoinClub: undefined;
  AnantaSelect: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  Setting: undefined;
  Logout: undefined;
};
