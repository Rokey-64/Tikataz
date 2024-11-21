'use strict'

import { errCode } from "../../errors.js"
import validator from 'validator'
import { getRedisKey } from "../services/db-connection/redis-jack.js"
import TkzRegException from "../exception/registerException.js"
import lookingUserEmail from "../resositories/lookingUserEmail.js"
import checkPassworSyntax from "./checkPassworSyntax.js"
import i18n from '../locales/i18n.js';


/**
 * Check if the email format is incorrect
 * @param {*} model 
 * @returns 
 */
const emailFormatInspector = async (model) => {
    const email = model.email;

    if (validator.isEmail(email)) {
       return errCode.NONE;
    }
    else {
        throw new TkzRegException(i18n.t('email_invalid'), errCode.EMAIL_INVALID);
    }
}


/**
 * Check if the email address is in use
 * @param {*} Sequelize 
 * @param {*} model 
 * @returns 
 */
const emailActivationInspector = async (model) => {

    const result = await lookingUserEmail(model.email);

    /**
     * Check if the query result is empty
     */
    if (result.length == 0) {
        throw new Error('Empty query result');
    }

    /**
     * Check if the query result has the required fields
     */
    if(!result[0].hasOwnProperty('isSpam') || !result[0].hasOwnProperty('isUse')) {
        throw new Error('isSpam ||| isUse is not found');
    }

    /**
     * Check if the email is in the blocked list or in use
     */
    if (result[0]['isSpam']) {
        throw new TkzRegException(i18n.t('email_invalid'), errCode.EMAIL_BLOCKED);
    }
    else if (result[0]['isUse']) {
        throw new TkzRegException(i18n.t('email_in_use'), errCode.EMAIL_ACTIVED);
    }
    else {
        return errCode.NONE;
    }
}

/**
 * Check if the token was sent to the user
 */
const emailTokenInspector = async (model) => {

    await getRedisKey(model.email).catch((err) => { return errCode.PROC_VERF_FAILED }).then((res) => {
        if (res) {
            throw new TkzRegException(i18n.t('email_in_waiting'), errCode.IS_WAITING_CONFIRM);
        }
        else {
            return errCode.NONE;
        }
    }).catch((err) => {
        throw err;
    })
}




/**
 * Check if the provided user infomation is invalid
 * @param {*} Sequelize - Sequelize instance
 * @param {*} model - user infomation
 * @returns 
 */
const inspector = async (model) => {
    await emailFormatInspector(model).catch((err) => {
        throw err;
    });

    await checkPassworSyntax(model).catch((err) => {
        throw err;
    });

    await emailTokenInspector(model).catch((err) => {
        throw err;
    });

    await emailActivationInspector(model).catch((err) => {
        throw err;
    });

    return errCode.NONE;
}


export default inspector
