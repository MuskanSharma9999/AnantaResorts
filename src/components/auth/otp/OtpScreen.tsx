import React, { useState, useEffect, useRef } from 'react';
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
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Logo from '../../../assets/images/AnantaLogo.svg';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import styles from './OtpScreenStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import GradientButton from '../../Buttons/GradientButton';
import { Alert } from 'react-native';
import { TabParamList } from '../navigation/types';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { OtpInput } from 'react-native-otp-entry';

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
  const [otp, setOtp] = useState(''); // Store as string for OtpInput
  const [resendTime, setResendTime] = useState(30);
  const [mobileNumber] = useState('****555'); // Would come from auth flow
  const navigation = useAppNavigation();

  const data = [
    { image: require('../../../assets/images/loginCarousel_images/img_1.jpg') },
    { image: require('../../../assets/images/loginCarousel_images/img_2.jpg') },
    { image: require('../../../assets/images/loginCarousel_images/img_3.jpg') },
    { image: require('../../../assets/images/loginCarousel_images/img_4.jpg') },
  ];

  useEffect(() => {
    if (resendTime > 0) {
      const timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTime]);

  const handleResendCode = () => {
    setResendTime(30);
    setOtp(''); // Clear OTP when resending
    // Add resend OTP logic
  };

  const handleVerify = () => {
    console.log('Verifying OTP:', otp, 'Length:', otp.length);
    
    if (!otp || otp.length !== 4) {
      Alert.alert('OTP Incomplete', 'Please enter all 4 digits of the OTP');
      return;
    }

    // Additional validation to ensure all characters are digits
    if (!/^\d{4}$/.test(otp)) {
      Alert.alert('Invalid OTP', 'Please enter valid numeric digits');
      return;
    }

    console.log('Verifying OTP:', otp);
    navigation.navigate('Signup');
  };

  const handleOtpFilled = (otpValue) => {
    console.log('OTP Filled:', otpValue);
    // Just log when OTP is filled, don't auto-verify
  };

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

            <View style={styles.bottomSection}>
              <Text style={styles.otpAlert}>OTP Alert</Text>
              <Text style={styles.otpInstructions}>
                Sent to mobile ending with {mobileNumber}
              </Text>

              <View style={styles.otpContainer}>
                <OtpInput
                  numberOfDigits={4}
                  focusColor="#D4AF37"
                  autoFocus={false}
                  hideStick={true}
                  placeholder="•"
                  blurOnFilled={true}
                  disabled={false}
                  type="numeric"
                  secureTextEntry={false}
                  focusStickBlinkingDuration={500}
                  onFocus={() => console.log('Focused')}
                  onBlur={() => console.log('Blurred')}
                  onTextChange={(value) => {
                    console.log('OTP changed:', value);
                    setOtp(value);
                  }}
                  onFilled={handleOtpFilled}
                  textInputProps={{
                    accessibilityLabel: 'One-Time Password',
                  }}
                  textProps={{
                    accessibilityRole: 'text',
                    accessibilityLabel: 'OTP digit',
                    allowFontScaling: false,
                  }}
                  theme={{
                    containerStyle: styles.otpContainer,
                    pinCodeContainerStyle: styles.otpInput,
                    pinCodeTextStyle: {
                      fontSize: 20,
                      fontWeight: '700',
                      color: '#000',
                    },
                    focusStickStyle: {
                      backgroundColor: '#D4AF37',
                      height: 2,
                    },
                    focusedPinCodeContainerStyle: {
                      borderColor: '#7AC678',
                      borderWidth: 2,
                      backgroundColor: '#fff',
                    },
                    placeholderTextStyle: {
                      color: '#ccc',
                    },
                    filledPinCodeContainerStyle: {
                      borderColor: '#D4AF37',
                      backgroundColor: '#fff',
                    },
                    disabledPinCodeContainerStyle: {
                      backgroundColor: '#e0e0e0',
                      borderColor: '#aaa',
                    },
                  }}
                />
              </View>

              <GradientButton
                title="Continue"
                onPress={handleVerify}
              />

              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResendCode}
                disabled={resendTime > 0}
              >
                <Text style={styles.resendText}>
                  Didn't receive code?{' '}
                  <Text style={styles.resendHighlight}>
                    {resendTime > 0
                      ? `Resend in ${resendTime}s`
                      : 'Resend Code'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default OtpScreen;