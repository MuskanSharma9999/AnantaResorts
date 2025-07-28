// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import GoldButton from '../components/GoldButton';
import styles from '../styles/LoginScreenStyles';
import Colors from '../styles/Colors';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (mobileNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      setTimeout(async () => {
        // Store user token (in real app, this would come from your API)
        await AsyncStorage.setItem('userToken', 'dummy_token');
        await AsyncStorage.setItem('userMobile', mobileNumber);
        setIsLoading(false);
        navigation.navigate('MainTabs' as never);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header with Logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>ananta</Text>
        <Text style={styles.logoSubtext}>Hotels & Resorts</Text>
      </View>

      {/* Background Image Section */}
      <View style={styles.imageSection}>
        {/* Replace with actual ImageBackground when you have the image */}
        <View style={styles.imagePlaceholder}>
          <View style={styles.locationBadge}>
            <Text style={styles.locationTitle}>RANTHAMBORE</Text>
            <Text style={styles.locationSubtitle}>NATURE'S PARADISE</Text>
          </View>
        </View>
      </View>

      {/* Bottom Section with Form */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)', '#000000']}
        style={styles.bottomSection}
      >
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome back.</Text>
          <Text style={styles.subText}>Login with your Mobile Number</Text>

          <View style={styles.inputContainer}>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Mobile number"
                placeholderTextColor={Colors.textMuted}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          <GoldButton
            title={isLoading ? 'Submitting...' : 'Submit'}
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.submitButton}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;
