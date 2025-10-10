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
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import styles from './OtpScreenStyles';
import { RouteProp, useRoute } from '@react-navigation/native';
import GradientButton from '../../Buttons/GradientButton';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { OtpInput } from 'react-native-otp-entry';
import { apiRequest } from '../../../Api_List/apiUtils';
import { RootStackParamList } from '../../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiList from '../../../Api_List/apiList';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../redux/slices/authSlice';
import { setUserDetails } from '../../../redux/slices/userSlice';
import OtpVerify from 'react-native-otp-verify';

type OtpScreenRouteProp = RouteProp<RootStackParamList, 'Otp'>;

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
  const route = useRoute<OtpScreenRouteProp>();
  const { phoneNumber, maskedPhone } = route.params;

  const [otp, setOtp] = useState('');
  const [resendTime, setResendTime] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [hasSmsPermission, setHasSmsPermission] = useState(false);

  const navigation = useAppNavigation();
  const dispatch = useDispatch();

  // Request SMS permission for Android
  useEffect(() => {
    const requestSmsPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
              title: 'SMS Reading Permission',
              message:
                'This app needs access to read SMS to automatically detect OTP',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          setHasSmsPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.warn('SMS permission error:', err);
        }
      }
    };

    requestSmsPermission();
  }, []);

  // Auto-read OTP from SMS
  useEffect(() => {
    if (hasSmsPermission) {
      OtpVerify.getHash()
        .then(hash => {
          console.log('OTP Hash:', hash);
        })
        .catch(error => console.log('Hash error:', error));

      OtpVerify.getOtp()
        .then(p => OtpVerify.addListener(otpHandler))
        .catch(p => console.log('OTP listener error:', p));

      return () => {
        OtpVerify.removeListener();
      };
    }
  }, [hasSmsPermission]);

  const otpHandler = (message: string) => {
    console.log('Received SMS:', message);
    const otpMatch = message.match(/\b\d{4,6}\b/);
    if (otpMatch) {
      const extractedOtp = otpMatch[0];
      console.log('Extracted OTP:', extractedOtp);

      if (extractedOtp.length === 4) {
        setOtp(extractedOtp);
        setTimeout(() => {
          handleVerify(extractedOtp);
        }, 500);
      }
    }
  };

  // Resend OTP function
  const handleResendOtp = async () => {
    if (resendTime > 0 || isResending) return;

    try {
      setIsResending(true);

      const response = await apiRequest({
        url: ApiList.SEND_OTP,
        method: 'POST',
        body: { phone: phoneNumber },
      });

      if (response.success) {
        // Reset timer and OTP input
        setResendTime(30);
        setOtp('');

        Alert.alert('Success', 'OTP has been resent to your mobile number');
      } else {
        Alert.alert(
          'Error',
          response.error || 'Failed to resend OTP. Please try again.',
        );
      }
    } catch (error) {
      console.error('Resend OTP Error:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  // Verify OTP function
  const handleVerify = async (providedOtp = null) => {
    const otpToVerify = providedOtp || otp;

    if (!otpToVerify || otpToVerify.length !== 4) {
      Alert.alert('OTP Incomplete', 'Please enter all 4 digits of the OTP');
      return;
    }
    if (!/^\d{4}$/.test(otpToVerify)) {
      Alert.alert('Invalid OTP', 'Please enter valid numeric digits');
      return;
    }

    try {
      setIsLoading(true);

      const response = await apiRequest({
        url: ApiList.VERIFY_OTP,
        method: 'POST',
        body: { phone: phoneNumber, otp_code: otpToVerify },
      });

      if (response.success) {
        const data = response.data?.data;
        const token = data?.token;
        const user = data?.user;

        console.log('User data from OTP:', user);

        if (token) {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('isAuth', 'true');

          dispatch(
            setUserDetails({
              name: user?.name || '',
              email: user?.email || '',
              profilePhoto: user?.profile_photo_url || '',
            }),
          );

          if (user?.name && user?.email) {
            dispatch(setAuth(true));
          } else {
            navigation.navigate('Signup');
          }
        } else {
          Alert.alert('Error', 'Token not found in response.');
        }
      } else {
        Alert.alert(
          'Error',
          response.error || 'Invalid OTP. Please try again.',
        );
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      Alert.alert('Error', error?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (resendTime > 0) {
      const timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTime]);

  const data = [
    { image: require('../../../assets/images/loginCarousel_images/img_1.jpg') },
    { image: require('../../../assets/images/loginCarousel_images/img_2.jpg') },
    { image: require('../../../assets/images/loginCarousel_images/img_3.jpg') },
    { image: require('../../../assets/images/loginCarousel_images/img_4.jpg') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.1 : 10}
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
                Sent to mobile ending with {maskedPhone}
              </Text>

              {hasSmsPermission && (
                <Text style={styles.autoReadText}>
                  📱 Auto-reading OTP from messages...
                </Text>
              )}

              <View style={styles.otpContainer}>
                <OtpInput
                  numberOfDigits={4}
                  focusColor="#D4AF37"
                  autoFocus={true}
                  hideStick={true}
                  placeholder="•"
                  blurOnFilled={false}
                  value={otp}
                  onTextChange={value => setOtp(value)}
                  onFilled={handleVerify}
                  theme={{
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
                  }}
                />
              </View>

              <GradientButton
                title={isLoading ? 'Verifying...' : 'Continue'}
                onPress={() => handleVerify()}
                disabled={isLoading}
              />

              <TouchableOpacity
                style={[
                  styles.resendButton,
                  (resendTime > 0 || isResending) &&
                    styles.resendButtonDisabled,
                ]}
                onPress={handleResendOtp}
                disabled={resendTime > 0 || isResending}
              >
                <Text style={styles.resendText}>
                  Didn't receive code?{' '}
                  <Text style={styles.resendHighlight}>
                    {isResending
                      ? 'Resending...'
                      : resendTime > 0
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
