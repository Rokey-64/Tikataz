import jwt from 'jsonwebtoken';
import fs, { cp } from 'fs';
import { showMessage } from '../fluentd-connection/fluentd-jack.js'
import 'dotenv/config.js'

const PRIVATE_DIR = './private.pem';
const PUBLIC_DIR = './public.pem';
const ACTIVED_TIME = 3;
let privateKey = '';
let publicKey = '';

/**
 * openssl genpkey -algorithm RSA -aes256 -out private.pem
 * openssl rsa -pubout -in private.pem -out public.pem
 */


/**
 * Read the private and public key
 */
await (async () => {
  try {
    privateKey = fs.readFileSync(PRIVATE_DIR, 'utf8');
  } catch (err) {
    await showMessage(err.message, 'src/services/register.token-auths | readPrivateKey', { model, payload });
  }

  try {
    publicKey = fs.readFileSync(PUBLIC_DIR, 'utf8');
  } catch (err) {
    await showMessage(err.message, 'src/services/register.token-auths | readPublishKey', { model, payload });
  }
}).call();

/**
 * Generate a token
 * 
 * Arguments:
 * 1. The payload (payload) - The payload of the token.
 * 2. The expiration time (60 days) - The expiration time of the token.
 * 
 * Return:
 * * token [string]
 */
const generateJWT = async (payload, expiresIn) => {

  /**
   * Create a secret
   */
  const secret = {
    key: privateKey,
    passphrase: process.env.FLUENTD_PASS_PHRASE
  };

  /**
   * Create options
   */
  const options = {
    algorithm: 'RS256',
    expiresIn: expiresIn
    // notBefore: ACTIVED_TIME,
  };

  /**
   * Generate a token
   */
  try {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });

    return token;
  } catch (err) {
    throw err;
  }
}

/**
 * Verify a email token
 * @param {*} token 
 * @returns 
 */
export const verifyJWT = async (token) => {
  try {
    const decoded = await jwt.verify(token, publicKey, { algorithms: ['RS256'], password: process.env.FLUENTD_PASS_PHRASE });
    return decoded;
  } catch (err) {
    throw err;
  }
}

export default generateJWT