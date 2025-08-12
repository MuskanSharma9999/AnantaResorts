import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './MainNavigator';
import { AuthNavigator } from './AuthNavigator';
import { useSelector } from 'react-redux'; // If using Redux for auth state
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const AppNavigator = () => {
  // Replace with your actual auth state logic
  // Here isAuthenticated should be coming from the async Storage.
  // Delete the isAuthenticated variable/data from the Async Storage while Logout.
  // If the OTP is valid then store the isAuthenticated value in the Async Storage, and let the user enter the App.

  const isAuthenticated = true;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
