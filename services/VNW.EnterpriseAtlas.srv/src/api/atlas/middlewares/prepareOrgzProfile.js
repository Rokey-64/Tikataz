import getUserOrgzProfile from "../services/getUserOrgzProfile.js";
import setFeedback from "#@/services/setFeedback.js";
import getModelService from "#@/services/getModelService.js";
import { showMessage } from "#@/databases/http_fluentd.js";

const repareOrgzProfile = async (req, res, next) => {
    const model = getModelService(req);



    try {
        const payload = await getUserOrgzProfile(model.uid, model.cid, model.ctype);

        // Hide some fields unless the user is logged in
        if (req.isUserLoggedIn === false) {
            payload.taxcode = payload.taxcode ? ((payload.taxcode?.slice(0, 3)) || '') + " **** " + (payload.taxcode?.slice(-3) || '') : "";
            payload.bizFields = "";
            payload.phoneNumber = payload.phoneNumber ? ((payload.phoneNumber?.slice(0, 3)) || '') + " *** " + (payload.phoneNumber?.slice(-3) || '') : "";
            payload.email = "******@" + payload.email?.split('@')[1] || '';
        }

        model.payload = payload;
        return next();
    }
    catch (error) {
        showMessage(error);
        return res.status(500).json(setFeedback(req.feedback, false));
    }
}

export default repareOrgzProfile;