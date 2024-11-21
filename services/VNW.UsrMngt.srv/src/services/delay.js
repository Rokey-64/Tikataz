
/**
 * Simulate a delay
 * @param {*} ms - The number of milliseconds to delay
 * @returns 
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default delay;