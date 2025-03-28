import _ from "lodash"

/**
 * List all the fields that have been changed in an object
 * [both objects must be the same structure]
 * @param {*} rootObj 
 * @param {*} changedObj 
 * @returns object of changed fields
 */
const selectChangedFields = (rootObj, changedObj, changedTarget, path="") => {

    if (_.isEqual(rootObj, changedObj)) return null;

    if (typeof rootObj === "object" && !Array.isArray(rootObj)) {
        for(const key in rootObj){
            const newPath = path ? `${path}.${key}` : key;
            selectChangedFields(rootObj[key], changedObj[key], changedTarget, newPath);
        }
    }
    else if (rootObj !== changedObj) {
        _.set(changedTarget, path, true);
    }
};

export default selectChangedFields;