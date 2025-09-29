import { Platform } from 'react-native';

let url = '';

// Dynamically set base URL based on platform
if (Platform.OS === 'android') {
  // For Android Emulator
  // url = 'http://10.0.2.2:6001/api';
  // If using physical Android device, comment above and uncomment below
  url = 'http://192.168.1.7:6001/api'; // Replace with your machine's local IP
} else {
  // For iOS Simulator or Physical iPhone (assuming machine IP)
  // url = 'http://192.168.1.7:6001/api'; // Replace with your machine's local IP
}

// For live/production (optional):
// url = 'http://103.191.132.144/ap/api'; // Live server

url = 'http://192.168.1.7:6001/api'; // Replace with your machine's local IP

export const ApiList = {
  SEND_OTP: `${url}/auth/send-otp`,
  VERIFY_OTP: `${url}/auth/verify-otp`,
  GET_PROFILE: `${url}/auth/profile`,
  UPDATE_PROFILE: `${url}/auth/profile`,
  UPDATE_PROFILE_PHOTO: `${url}/auth/upload-profile-photo`,

  GET_ALL_RESORTS: `${url}/resorts`,
  GET_ALL_ROOMS: `${url}/rooms`,
  GET_RESORT_BY_ID: id => `${url}/resorts/${id}`,
  UPDATE_KYC: `${url}/kyc/upload`,

  SUBMIT_REVIEW: `${url}/resorts`,
  GET_REVIEW: `${url}/resorts`,

  GET_MEMBERSHIP_PLANS: `${url}/memberships/plans`,
};

export default ApiList;
