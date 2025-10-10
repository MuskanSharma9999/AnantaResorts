// src/navigation/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Otp: {
    phoneNumber: string;
    maskedPhone: string;
  };
  Signup: undefined;
  DrawerRoot: undefined;
  TopRated: undefined;
  ResortDetails: { resortId: string }; // example param
};

export type TabParamList = {
  Home: undefined;
  JoinClub: undefined;
  AnantaSelect: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  ContactUs: undefined;
  BookingHistory: undefined;
  Logout: undefined;
};
