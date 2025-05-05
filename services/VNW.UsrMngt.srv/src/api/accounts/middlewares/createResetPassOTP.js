import delay from '#@/services/delay.js';
import getModelService from '#@/services/getModelService.js';
import generateOTP, { checkOTP } from '#@/services/otpService.js';
import sessionService from '#@/services/sessionService.js';

const expiresIn3Minutes = 3 * 60 * 1000;

/**
 * Create an OTP for the user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const createResetPassOTP = async (req, res, next) => {
    const model = getModelService(req);
    const user = model.user;

    /**
     * Generate a random OTP.
     * 
     * Description: OTP is a 6 digit number and time to live is 3 minutes.
     * otp group: {otp, expiredAt}
     * 
     */
    const otp = generateOTP(expiresIn3Minutes);


    /**
     * Pass the OTP to the user.
     * 
     * Fields:
     * user.content - The OTP that was generated.
     * 
     */
    user.otp = otp;

    return next();
}

export default createResetPassOTP;