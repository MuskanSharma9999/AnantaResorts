// const url = "http://192.168.1.15:3000";
const url = "http://103.191.132.144/api";

export const ApiList = {
SEND_OTP: `${url}/auth/send-otp`,
  VERIFY_OTP: `${url}/auth/verify-otp`,
  GET_PROFILE: `${url}/auth/profile`,
  UPDATE_PROFILE: `${url}/auth/profile`
};

export default ApiList;
