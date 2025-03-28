import _ from 'lodash';

/**
 * Build a card model from the card object to store in the database (When you need to update just a few fields instead of the whole card, you need to build a model with the fields that were changed)
 * @param {*} target - An True/False Object that determines if the card' elements was changed
 * @param {*} payload - The payload object that contains the new data
 * @returns root - The new card model
 */
const buildCardModel = (target, payload) => {
    const root = {}

    for(const key in target){
        if(typeof target[key] === "object"){
            const node = buildCardModel(target[key], payload[key]);

            if(node){
                root[key] = node;
            }
        }
        else{
            _.set(root, key, _.cloneDeep(payload[key]));
        }
    }

    return root;
};

/**
 * Build a fast card model from the card object to store in the database (When you need to update just a few fields instead of the whole card, you need to build a model with the fields that were changed)
 * @param {*} target - An True/False Object that determines if the card' elements was changed
 * @param {*} payload - The payload object that contains the new data
 * @returns root - The new card model
 */
export const buildFastCardModel = (target, payload, root = {}, path="") => {

    for(const key in target){
        const newPath = path ? `${path}.${key}` : key;
        if(typeof target[key] === "object"){
            const node = buildFastCardModel(target[key], payload[key], root, newPath);
        }
        else{

            root[newPath] = _.cloneDeep(payload[key]);
        }
    }

    return root;
};


export default buildCardModel;