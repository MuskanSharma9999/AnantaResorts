// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SplashScreenStyles';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Always navigate to onboarding first, regardless of previous state
    setTimeout(() => {
      navigation.replace('Onboarding' as never);
    }, 5000); // 5 seconds delay
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Replace with your logo */}
        <Text style={styles.logoText}>ANANTA</Text>
        <Text style={styles.subText}>RESORTS</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
