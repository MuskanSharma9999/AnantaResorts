import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './MainNavigator';
import { AuthNavigator } from './AuthNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  ActivityIndicator,
  AppState,
  AppStateStatus,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/slices/authSlice';
import { fetchUserProfile } from '../redux/slices/userSlice';

export const AppNavigator = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );

  // ✅ Initialize app: Check auth + Fetch user profile
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('[AppNavigator] Initializing app...');

        const token = await AsyncStorage.getItem('token');
        const isAuth = await AsyncStorage.getItem('isAuth');

        if (isAuth === 'true' && token) {
          console.log(
            '[AppNavigator] User authenticated, setting auth state...',
          );
          dispatch(setAuth(true));

          // ✅ CRITICAL: Fetch user profile immediately on app start
          console.log('[AppNavigator] Fetching initial user profile...');
          const result = await dispatch(fetchUserProfile(true)).unwrap();

          console.log('[AppNavigator] ✓ Initial profile loaded:', {
            name: result.name,
            email: result.email,
            activeMembership: result.activeMembership,
          });
        } else {
          console.log('[AppNavigator] User not authenticated');
          dispatch(setAuth(false));
        }
      } catch (error) {
        console.error('[AppNavigator] Initialization error:', error);
        dispatch(setAuth(false));
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  // ✅ Refresh user data when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState: AppStateStatus) => {
        // App came to foreground from background/inactive
        if (
          appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('[AppNavigator] App came to foreground');

          if (isAuthenticated) {
            const token = await AsyncStorage.getItem('token');

            if (token) {
              console.log('[AppNavigator] Refreshing user profile...');
              try {
                await dispatch(fetchUserProfile(true)).unwrap();
                console.log('[AppNavigator] ✓ Profile refreshed on foreground');
              } catch (error) {
                console.error(
                  '[AppNavigator] Failed to refresh profile:',
                  error,
                );
              }
            }
          }
        }
        setAppState(nextAppState);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [appState, isAuthenticated, dispatch]);

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
        <ActivityIndicator size="large" color="#FBCF9C" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
