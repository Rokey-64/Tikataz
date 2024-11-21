/**
 * Check if required fields are present in the fields object
 * @param {*} fields - The object containing the fields
 * @param {*} requiredFields - The array of required fields
 */
const checkRequiredFields = (model, requiredFields) => {
    // Push default required fields
    requiredFields.push('lang', 'deviceID');
    
    for (let field of requiredFields) {
        if (!model[field]) {
            return false;
        }
    }
    return true;
};

export default checkRequiredFields;