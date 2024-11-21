import msg from './massages.json' assert { type: "json" };
import 'dotenv/config';
const lang = process.env.LANGUAGE || 'vi';


export const errCode = {
    /**
     * This is used when there are no errors.
     */
    NONE: 0,

    /**
     * This is used when there are system errors.
     */
    SYSTEM_ERR: -1,

    /**
     * This is used when the email address is in use.
     */
    EMAIL_ACTIVED: 1001,

    /**
     * use this when the email address format is marked as spam.
     */
    EMAIL_BLOCKED: 1002,

    /**
     * This is used when the email address format is incorrect.
     */
    EMAIL_INVALID: 1003,

    /**
     * This is used when the password is too weak and easy to hack.
     */
    PASSWORD_WEAK: 1004,

    /**
     * This is used when the password length is less than 8 characters.
     */
    PASSWORD_SHORT: 1005,

    /**
     * This is used when the password contains space.
     */
    PASSWORD_WITHOUT_SPACE: 1006,

    /**
     * This is used when the password doesn't matched.
     */
    PASSWORD_NOT_MATCH: 1007,

    /**
     * This is used when the token was sent.
     */
    IS_WAITING_CONFIRM: 1009,

    /**
     * The link have verified already.
     */
    LINK_VERIFIED: 1010,

    /**
    * The link have expired.
    */
    LINK_EXPIRED: 1011,

    /**
     * The link is invalid.
     */
    LINK_INVALID: 1012,

    /**
     * This is used when the username is empty.
     */
    USERNAME_IS_EMPTY: 1013,

    /**
     * Cannot send the email right now.
     */
    MAIL_OR_PW_UNCORRECT: 1014,

    /**
     * The user is not found.
     */
    USER_NOT_FOUND: 1015,

    /**
     * The password or username is incorrect.
     */
    USER_ACOUNT_INCORRECT: 1016,


    /**
     * OTP is expired.
     */
    OTP_EXPIRED: 1017,

    /**
     * TOKEN is expired.
     */
    TOKEN_EXPIRED: 1018,

    /**
     * Password should not be duplicated.
     */
    DUPLICATED_PASSWORD: 1019,

    /**
     * A link have been sent to the email address.
     */
    LINK_SENT: 2001,

    /**
     * The user is created successfully.
     */
    USER_CREATED: 2002,

    /**
     * There have been an error in the verification process.
     */
    PROC_VERF_FAILED: 9001,

    /**
     * The link is being activated.
     */
    LINK_BEING_ACTIVATED: 9002,

    /**
     * The user model is invalid.
     */
    INVALID_USER_MODEL: 9003,

    /**
     * Cannot send the email right now.
     */
    SEND_MAIL_FAILED: 9004,

    /**
     * The access token is not found.
     */
    ERR_ACCESSTOKEN_NOT_FOUND : 9005,

    /**
     * The refresh token is not found.
     */
    ERR_REFRESHTOKEN_NOT_FOUND : 9006,

    /**
     * Access token is invalid.
     */
    ERR_ACCESSTOKEN_INVALID: 9007,

    /**
     * Refresh token is invalid.
     */
    ERR_REFRESHTOKEN_INVALID: 9008,
};

/**
 * Set the feedback to fail
 * @param {*} feedback 
 * @param {*} code 
 * @param {*} message 
 * @returns 
 */
export const setFailedFeedback = (feedback, code, message = 'Sytem failed') => {
    feedback.error = { code: code, message: message || msg?.[code]?.[lang] };
    feedback.status = 'failed';
    return feedback;
}