
import getModelService from "#@/services/getModelService.js";

const setCookies = (req, res, next)=>{
    const model = getModelService(req);
    const { COOKIE_HTTP_ONLY, COOKIE_SECURE, COOKIE_SAME_SITE, COOKIE_DOMAIN} = process.env;

    /**
     * Set the refresh token and access token to the cookies
     * 
     * Fields:
     * * model.user.refreshToken - The refresh token.
     */
    res.cookie('refreshToken', model.user.refreshToken, { 
        httpOnly: COOKIE_HTTP_ONLY === 'true', 
        secure: COOKIE_SECURE === 'true', 
        sameSite: COOKIE_SAME_SITE,
        maxAge: 1000 * 60 * 60 * 24 * 60, // 60 days
        domain: COOKIE_DOMAIN
     });

    /**
     * Set the access token to the cookies
     * 
     * Fields:
     * * model.user.accessToken - The access
     */
    res.cookie('accessToken', model.user.accessToken, { 
        httpOnly: COOKIE_HTTP_ONLY === 'true', 
        secure: COOKIE_SECURE === 'true', 
        sameSite: COOKIE_SAME_SITE,
        maxAge: 15 * 60 * 1000, // 15'
        domain: COOKIE_DOMAIN
    });

    return next();
}

export default setCookies;