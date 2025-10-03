// AppInitializer.js
// Place this in: src/components/AppInitializer.js
// Import this in your App.js or root navigation file

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserProfile } from '../redux/slices/userSlice';

/**
 * AppInitializer - Ensures user data is loaded when app starts
 * Place this component in your root navigation or App.js
 */
export const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const { lastUpdated } = useSelector(state => state.user);

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        // Only fetch if user is authenticated
        const token = await AsyncStorage.getItem('token');
        const authStatus = await AsyncStorage.getItem('isAuth');
        
        if (token && (authStatus === 'true' || isAuth)) {
          console.log('[AppInitializer] User is authenticated, fetching profile...');
          
          // Fetch user profile on app start
          dispatch(fetchUserProfile(false));
        } else {
          console.log('[AppInitializer] User not authenticated, skipping profile fetch');
        }
      } catch (error) {
        console.error('[AppInitializer] Error initializing user data:', error);
      }
    };

    initializeUserData();
  }, [isAuth, dispatch]);

  // Log when user data is loaded
  useEffect(() => {
    if (lastUpdated) {
      console.log('[AppInitializer] User data loaded at:', new Date(lastUpdated).toISOString());
    }
  }, [lastUpdated]);

  return children;
};

export default AppInitializer;