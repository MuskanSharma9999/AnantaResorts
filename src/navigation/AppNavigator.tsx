import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './MainNavigator';
import { AuthNavigator } from './AuthNavigator';
import { useSelector } from 'react-redux'; // If using Redux for auth state
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const AppNavigator = () => {
  // Replace with your actual auth state logic
  const isAuthenticated = true; // Example: useSelector(state => state.auth.isAuthenticated);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
