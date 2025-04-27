import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import saveLeaderService from "../services/saveProfileService.js";
import {GENERATING_COMPANY_LOGO_KEY} from "../../../services/generateRedisKeys.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * Save the profile to the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const ProfileSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const profile = model.profile;
    const key = GENERATING_COMPANY_LOGO_KEY(req.userID);

    try {
        const result = await saveLeaderService({
            name: profile.name,
            taxcode: profile.taxCode,
            date: profile.date.replace(/-/g, ''),
            address: profile.address,
            businessField: profile.businessField,
            uid: req.userID,
            vision: profile.vision,
            mission: profile.mission,
            fax: profile.fax,
            nation: profile.nation.id,
            phone: profile.phone,
            email: profile.email,
            logoIndex: key
        });

        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }

    }
    catch (err) {
        showMessage("profileSavingMiddleware", err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default ProfileSavingMiddleware;