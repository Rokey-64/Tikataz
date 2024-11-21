
/**
 * Generate a accestoken key  for the redis template
 * 
 * Arguments:
 * 1. The user ID (currPayload.userID) - The user ID.
 * 
 * Returns:
 * The key for the refresh token: `access-token:${userID}`
 * 
 */
export const genACKey = (userID) => `access-token:${userID}`;

/**
 * Generate a refreshtoken key for the refresh token
 * 
 * Arguments:
 * 1. The user ID (currPayload.userID) - The user ID.
 * 
 * Returns:
 * The key for the refresh token: `Refresh-token:${userID}:${deviceID}`
 * 
 */
export const genRFKey = (userID, deviceID) => `Refresh-token:${userID}:${deviceID}`;

/**
 * Generate a login OTP key for the redis template
 * 
 * Arguments:
 * 1. The user ID (currPayload.userID) - The user ID.
 * 
 * Returns:
 * The key for the refresh token: `OTP:${userID}.login`
 * 
 */
export const genLoginOTPKey = (userID) => `OTP:${userID}.login`;


/**
 * Generate a reset OTP key for the redis template
 * 
 * Arguments:
 * 1. The user ID (currPayload.userID) - The user ID.
 * 
 * Returns:
 * The key for the refresh token: `OTP:${userID}.login`
 * 
 */
export const genResetOTPKey = (userID) => `OTP:${userID}.reset`;