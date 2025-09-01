const url = "http://192.168.1.15:3000";

export const ApiList = {
  SEND_OTP: `${url}/api/auth/send-otp`,
  VERIFY_OTP: `${url}/api/auth/verify-otp`,
  GET_PROFILE: `${url}/api/auth/profile`,
  UPDATE_PROFILE: `${url}/api/auth/profile`
};

export default ApiList;
