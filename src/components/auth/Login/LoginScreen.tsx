// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import GoldButton from '../../../components/GoldButton';
import styles from '../../../styles/LoginScreenStyles';
import Colors from '../../../styles/Colors';
import Logo from '../../../assets/images/AnantaLogo.svg';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import GradientButton from '../../Buttons/GradientButton';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { width, height } = Dimensions.get('window');

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

  const data = [
    {
      image: require('../../../assets/images/loginCarausel_images/img_1.jpg'),
    },
    {
      image: require('../../../assets/images/loginCarausel_images/img_2.jpg'),
    },
    {
      image: require('../../../assets/images/loginCarausel_images/img_3.jpg'),
    },
    {
      image: require('../../../assets/images/loginCarausel_images/img_4.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Logo width={width * 0.3} height={80} style={styles.logo} />
      </View>

      {/* Main Image Section with Carousel */}
      <View style={styles.imageSection}>
        <Carousel
          loop
          autoPlay
          width={width}
          height={height * 0.65}
          data={data}
          scrollAnimationDuration={2000}
          autoPlayInterval={3000}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item.image} style={styles.carouselImage} />
            </View>
          )}
        />
      </View>

      {/* Bottom Login Form Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.subText}>Login with your Mobile Number</Text>

        <View style={styles.formContainer}>
          <View style={styles.phoneInputContainer}>
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.phoneInput}
                placeholder="Mobile number"
                placeholderTextColor="#6B6B6B"
                value={mobileNumber}
                onChangeText={text => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  setMobileNumber(numericText);
                }}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          <GradientButton
            style={{ width: '100%' }}
            onPress={handleLogin}
            disabled={isLoading}
            title={isLoading ? 'Submitting...' : 'Submit'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
