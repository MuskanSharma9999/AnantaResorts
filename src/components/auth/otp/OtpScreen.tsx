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

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // 4-digit OTP
  const [resendTime, setResendTime] = useState(30);
  const [mobileNumber] = useState('****555'); // Would come from auth flow
  const inputRefs = useRef<Array<TextInput | null>>([]);
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
    // Add resend OTP logic
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only single digit or empty

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (updatedOtp.every(digit => digit !== '')) {
      handleVerify();
    }
  };

  const handleVerify = () => {
    if (otp.some(digit => digit === '')) {
      Alert.alert('OTP Incomplete', 'Please enter all 4 digits of the OTP');

      return;
    }

    const enteredOtp = otp.join('');
    console.log('Verifying OTP:', enteredOtp);

    navigation.navigate('Home');
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
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={ref => (inputRefs.current[index] = ref)}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={value => handleOtpChange(index, value)}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace') {
                        if (otp[index] === '' && index > 0) {
                          const newOtp = [...otp];
                          newOtp[index - 1] = '';
                          setOtp(newOtp);
                          inputRefs.current[index - 1]?.focus();
                        } else {
                          const newOtp = [...otp];
                          newOtp[index] = '';
                          setOtp(newOtp);
                        }
                      }
                    }}
                    autoCorrect={false}
                    contextMenuHidden={true}
                    importantForAutofill="no"
                    autoFocus={index === 0}
                    selectionColor="#D4AF37"
                    caretHidden={false}
                  />
                ))}
              </View>

              <GradientButton
                title="Continue"
                onPress={handleVerify}
              ></GradientButton>

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
