
import sessionService from "../services/sessionService.js";
import getModelService from "../services/getModelService.js";

const setCookies = (req, res, next)=>{
    const model = getModelService(req);

    /**
     * Set the refresh token and access token to the cookies
     * 
     * Fields:
     * * model.user.refreshToken - The refresh token.
     */
    res.cookie('refreshToken', model.user.refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });

    /**
     * Set the access token to the cookies
     * 
     * Fields:
     * * model.user.accessToken - The access
     */
    res.cookie('accessToken', model.user.accessToken, { httpOnly: true, secure: true, sameSite: 'none' });

    return next();
}

export default setCookies;