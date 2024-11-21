'use strict'

import { errCode } from "../../errors.js"
import validator from 'validator'
import TkzRegException from "../exception/registerException.js"
import i18n from '../locales/i18n.js'


/**
 * Check if the input password is weak
 * @param {*} model 
 * @returns 
 */
const passwordStrengthInspector = async (model) => {
    const password = model.password;

    if (validator.isStrongPassword(password)) {
        return errCode.NONE;
    }
    else {
        throw new TkzRegException(i18n.t('password_too_week'), errCode.PASSWORD_WEAK);
    }
}

/**
 * Check if the input password is too short
 * @param {*} model 
 * @returns 
 */
const passwordLengthInspector = async (model) => {
    const password = model.password;

    if (password.length >= 8) {
        return errCode.NONE;
    }
    else {
        throw new TkzRegException(i18n.t('password_too_week'), errCode.PASSWORD_SHORT);
    }
}

/**
 * Check if the input password contains space
 * @param {*} model 
 * @returns 
 */
const passwordWithoutSpaceInspector = async (model) => {
    const password = model.password;

    if (password.indexOf(' ') === -1) {
        return errCode.NONE;
    }
    else {
        throw new TkzRegException(i18n.t('password_not_space'), errCode.PASSWORD_WITHOUT_SPACE);
    }
}

/**
 * check if the password is not matched
 * @param {*} model 
 * @returns 
 */
const passwordNotMatchInspector = async (model) => {
    const password = model.password;
    const password2 = model.confirmPassword;

    if (password === password2) {
        return errCode.NONE;
    }
    else {
        throw new TkzRegException(i18n.t('password_not_match'), errCode.PASSWORD_NOT_MATCH);
    }
}


/**
 * Check if the password is invalid
 */
export const checkPassworSyntax = async (model) => {
    await Promise.all([
        passwordLengthInspector(model),
        passwordStrengthInspector(model),
        passwordWithoutSpaceInspector(model),
        passwordNotMatchInspector(model)
    ]).catch((err) => {
        throw err;
    });

    return errCode.NONE;
}

export default checkPassworSyntax
