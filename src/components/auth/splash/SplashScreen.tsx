// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SplashScreenStyles';
import Logo from '../../../assets/images/AnantaLogo.svg';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Always navigate to onboarding first, regardless of previous state
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 1000); // 5 seconds delay
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={200} height={200} />
      </View>
    </View>
  );
};

export default SplashScreen;
