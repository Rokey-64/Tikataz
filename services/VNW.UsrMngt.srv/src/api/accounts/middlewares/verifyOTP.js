
import generateOTP, {checkOTP} from '#@/services/otpService.js';
import getModelService from '#@/services/getModelService.js';
import delay from '#@/services/delay.js';
import setFeedback from '#@/services/setFeedback.js';

/**
 * Verify the OTP
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyOTP = async (req, res, next) => {
    const model = getModelService(req);
    const user = model.user;
    const otp = model.otp;

    if(!otp)
        return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                'The OTP cannot be found',
                { 
                    prevID: req.id,
                    userNotification: req.t('otp_not_found')
                }
            )
        );

    /**
     * Verify the OTP, if it is out of date, or incorrect, return an error.
     * 
     * Fields:
     * * otp - The OTP that was generated.
     * * expiredAt - The expiration time of the OTP in seconds.
     */
    if(!checkOTP(otp, user.otp))
        return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                'The OTP is incorrect or expired',
                { 
                    prevID: req.id,
                    userNotification: req.t('otp_expired')
                }
            )
        );


    //await delay(2000); // Simulate a delay of 2 seconds to make the OTP expire

    return next();
}

export default verifyOTP;