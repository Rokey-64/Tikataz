import argon2 from 'argon2';
import crypto from 'crypto';

/**
 * hashPassword - Hashes the password using argon2
 * @param {*} password 
 * @returns 
 */
export const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password, {
            timeCost: 4,
            memoryCost: 2 ** 16,
            parallelism: 2,
            type: argon2.argon2id,
        });

        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

/**
 * verifyPassword - Verifies the password using argon2
 * @param {*} password 
 * @param {*} hashedPassword 
 * @returns 
 */
export const verifyPassword = async (password, hashedPassword) => {
    try {
        const isPasswordValid = await argon2.verify(hashedPassword, password);
        return isPasswordValid;
    } catch (error) {
        throw error;
    }
};

/**
 * hashOTP - Hashes the OTP using sha256
 * @param {*} otp 
 * @returns 
 */
export const hashOTP = (otp) => {
    const secret = process.env.SESSION_SECRET;
    const hash = crypto.createHmac('sha256', secret)
                       .update(otp)
                       .digest('hex');
    return hash;
}