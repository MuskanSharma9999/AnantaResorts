import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuth } from '../redux/slices/authSlice';
import { Alert } from 'react-native';

export const logoutUser = async (dispatch, navigation) => {
  try {
    await AsyncStorage.multiRemove(['token', 'isAuth']);
    dispatch(setAuth(false));
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (error) {
    console.error('Logout error:', error);
    Alert.alert('Error', 'Failed to log out. Please try again.');
  }
};
