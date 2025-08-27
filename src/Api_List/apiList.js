const url = 'http://192.168.1.6:9000/api/auth';

export const ApiList = {
  SEND_OTP: `${url}/send-otp`,
  VERIFY_OTP: `${url}/verify-otp`,
};
export default ApiList;
