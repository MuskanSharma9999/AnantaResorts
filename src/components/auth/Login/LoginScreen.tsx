// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import styles from './LoginScreenStyles';
import Logo from '../../../assets/images/AnantaLogo.svg';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import PhoneInputWithCountryCode from '../../PhoneInputWithCountryCode';

const LoginScreen = () => {
  const { width, height } = Dimensions.get('window');

  const data = [
    {
      image: require('../../../assets/images/loginCarousel_images/img_1.jpg'),
    },
    {
      image: require('../../../assets/images/loginCarousel_images/img_2.jpg'),
    },
    {
      image: require('../../../assets/images/loginCarousel_images/img_3.jpg'),
    },
    {
      image: require('../../../assets/images/loginCarousel_images/img_4.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={{ flex: 1 }}>
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

            {/* This is your sticky bottom sheet */}
            <View style={styles.bottomSection}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.subText}>Login with your Mobile Number</Text>
              <View style={styles.formContainer}>
                <View style={styles.phoneInputContainer}>
                  <PhoneInputWithCountryCode></PhoneInputWithCountryCode>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;
