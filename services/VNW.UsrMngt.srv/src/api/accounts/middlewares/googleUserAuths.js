import lookingUserBeforeLogin from "#@/api/accounts/resositories/lookingUserBeforeLogin.js";
import getModelService from "#@/services/getModelService.js";

/**
 * Check whether the user exists in the database or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const googleUserAuths = async (req, res, next) => {
    const model = getModelService(req);
    const user = req?.user;

    try{
        const result = await lookingUserBeforeLogin(user.emails[0].value);
        model.hasAccount = true;
    }
    catch (err) {
        model.hasAccount = false;
    }

    return next();
}   

export default googleUserAuths;