import KeyGenerator from './keyGenerator.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';

class JwtGenerator extends KeyGenerator {
    constructor() {
        super();
        this.privateFile = null;
        this.publicFile = null;
    }
    
    async loadKeys() {
        try {
            this.privateFile = await fs.promises.readFile('./private.pem', 'utf8');
            this.publicFile = await fs.promises.readFile('./public.pem', 'utf8');
        } catch (err) {
            throw new Error('Error loading keys: ' + err.message);
        }
    }

    async generateKey(payload, expiresIn) {

        const privateKey = {
            key: this.privateFile,
            // passphrase: process.env.FLUENTD_PASS_PHRASE
        };

        const options = {
            algorithm: 'RS256',
            expiresIn: expiresIn
        };

        try {
            const token = await new Promise((resolve, reject) => {
                jwt.sign(payload, privateKey, options, (err, token) => {
                    if (err) return reject(err);
                    resolve(token);
                });
            });

            return token;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Giải mã token JWT và trả về payload nếu hợp lệ
     */
    async verifyToken(token) {
        try {
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, this.publicFile, { algorithms: ['RS256'] }, (err, decoded) => {
                    if (err) return reject(err);
                    resolve(decoded);
                });
            });

            return decoded;
        } catch (err) {
            throw err
        }
    }
}


let instance = null;

export async function getJwtGenerator() {
    if (!instance) {
        instance = new JwtGenerator();
        await instance.loadKeys(); // đảm bảo chỉ load key 1 lần duy nhất
    }
    return instance;
}
