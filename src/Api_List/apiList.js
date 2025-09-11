import { Platform } from 'react-native';

let url = '';

if (__DEV__) {
  // Development mode
  if (Platform.OS === 'ios') {
    url = 'http://localhost:3000';
    // iOS simulator uses localhost
  } else if (Platform.OS === 'android') {
    url = 'http://10.0.2.2:3000';
    // Android emulator uses 10.0.2.2
  }

  // Override for testing on a physical device
  // Replace with your computer's LAN IP if running on a real device
  url = 'http://192.168.1.12:3000';

  //192.168.1.30. local ip address. cmd ==             ipconfig getifaddr en0
} else {
  // Production build
  url = 'https://your-production-api.com';
}

export const ApiList = {
  SEND_OTP: `${url}/api/auth/send-otp`,
  VERIFY_OTP: `${url}/api/auth/verify-otp`,
  GET_PROFILE: `${url}/api/auth/profile`,
  UPDATE_PROFILE: `${url}/api/auth/profile`,
  // UPDATE_PROFILE_PHOTO: `${url}/api/auth/upload-profile-photo`,
  GET_ALL_RESORTS:  `${url}/api/resorts`,   
  // GET_PROFILE_PHOTO: `${url}/api/auth/profile-photo`,
};

export default ApiList;
