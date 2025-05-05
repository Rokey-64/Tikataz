import crypto from 'crypto';
import { showMessage } from '#@/services/fluentd-connection/fluentd-jack.js';


/**
 * Generate OTP (One Time Password)
 * 
 * create a random 6-digit number as OTP
 * @returns 
 * @param {*} expiredAt - The expiration time of the OTP in seconds .
 */
const generateOTP = (timeout) => {
  const otp = crypto.randomInt(100000, 1000000).toString();
  const expiredAt = Date.now() + timeout; // 3 minutes from now
  showMessage('OTP generated', {otp, expiredAt});
  return {otp, expiredAt};
}

/**
 * Check if the OTP is still valid
 * @param {*} otp - The OTP to check
 * @param {*} sessionOTP - The session OTP to check {otp, expiredAt}
 * @returns 
 */
export const checkOTP = (otp, sessionOTP) => {
  
  if (!sessionOTP) return false;
  if(!otp) return false;
  if (Date.now() > sessionOTP?.expiredAt) return false;
  if (otp !== sessionOTP?.otp) return false;

  return true;
}

export default generateOTP;
  