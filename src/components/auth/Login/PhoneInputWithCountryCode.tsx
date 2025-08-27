import React, { useRef, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import GradientButton from '../../Buttons/GradientButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Api_List from '../../../Api_List/apiList';

const PhoneInputWithCountryCode = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const sendOTP = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    const isValid = phoneInput.current?.isValidNumber(phoneNumber);

    if (!isValid) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    const formattedNumber =
      phoneInput.current?.getNumberAfterPossiblyEliminatingZero()
        .formattedNumber;

    try {
      setIsLoading(true);

      const response = await axios.post(
        Api_List.SEND_OTP,
        { phone: formattedNumber },
        { headers: { 'Content-Type': 'application/json' } },
      );
      if (response.status === 200) {
        await AsyncStorage.setItem('userMobile', formattedNumber ?? '');

        Alert.alert('Success', 'OTP sent successfully!', [
          {
            text: 'OK',
            onPress: () =>
              // Ensure formattedNumber is defined and cast navigation to any to avoid type errors
              (navigation as any).navigate('Otp', {
                phoneNumber: formattedNumber,
                maskedPhone: formattedNumber
                  ? `${formattedNumber.slice(0, -4)}****`
                  : '****',
              }),
          },
        ]);
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Failed to send OTP. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="IN"
        withDarkTheme={true}
        withShadow={true}
        layout="second"
        onChangeFormattedText={text => setPhoneNumber(text)}
        placeholder="Mobile number"
        containerStyle={{
          width: '100%',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#aaa', // thin gray border
          backgroundColor: '#948585ff', // pure black background
          marginBottom: 10,
          height: 50,
        }}
        textContainerStyle={{
          backgroundColor: '#948585ff', // same as container
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          paddingVertical: 0,
        }}
        textInputStyle={{
          color: '#000000ff', // light gray text
          fontSize: 16,
          paddingVertical: 8,
        }}
        codeTextStyle={{
          color: '#000000ff', // light gray text
          fontSize: 16,
        }}
        flagButtonStyle={{
          backgroundColor: '#948585ff', // make same background
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          paddingVertical: 0,
        }}
      />

      <GradientButton
        style={{ width: '100%', marginTop: 20, marginBottom: 30 }}
        onPress={sendOTP}
        disabled={isLoading}
        title={isLoading ? 'Sending OTP...' : 'Send OTP'}
      />
    </View>
  );
};

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E3E5E5',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 30,
//   },
//   countryCodeButton: {
//     paddingVertical: 12,
//     marginRight: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   phoneInput: {
//     flex: 1,
//     fontSize: 16,
//     paddingVertical: 12,
//     color: '#cfdbe2ff',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '60%',
//     backgroundColor: '#474444ff',
//     borderRadius: 10,
//     maxHeight: '50%',
//   },
//   countryItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#1E1E1E',
//   },
//   countryItemRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   countryCodeText: {
//     fontSize: 14,
//     color: '#cfdbe2ff',
//     width: 60, // give a fixed width for alignment, tweak as needed
//   },
//   countryNameText: {
//     fontSize: 14,
//     color: '#cfdbe2ff',
//     flex: 1, // allow name to take the remaining space
//   },

//   closeButton: {
//     padding: 15,
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: '#1E1E1E',
//   },
//   closeButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

export default PhoneInputWithCountryCode;
