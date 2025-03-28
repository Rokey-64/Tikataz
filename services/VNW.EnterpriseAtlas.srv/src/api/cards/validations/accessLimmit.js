import { cluster } from '../../../databases/redis-jack.js';

/**
 * Get the access limmit from the redis state
 * @param {*} userID 
 * @returns 
 */
const getStateAccessLimmit = async (userID, cardID) => {
    const val = await cluster.get(`access:cards-${userID}-${cardID}`);
    return val ? parseInt(val) : 0;
}

/**
 * Increase one access limmit to the redis state
 */
const setStateAccessLimmit = async (userID, cardID, value) => {
    const val = value ? value : await getStateAccessLimmit(userID)+1;
    const result = await cluster.set(`access:cards-${userID}-${cardID}`, val, 'NX', 'EX', 60*60*24);
    if (!result) {
        await cluster.set(`access:cards-${userID}-${cardID}`, val, 'KEEPTTL');
    }
}

export { getStateAccessLimmit, setStateAccessLimmit };