

class KeyGenerator {

    /**
     * Creates a key for the JWT token
     * @param {*} ttl 
     */
    generateToken(payload, expiresIn) {
        throw new Error("Not implemented yet");
    }

    /**
     * Decrypt the key to get the original payload
     * @param {*} key 
     */
    verifyToken(token) {
        throw new Error("Not implemented yet");
    }

}

export default KeyGenerator;