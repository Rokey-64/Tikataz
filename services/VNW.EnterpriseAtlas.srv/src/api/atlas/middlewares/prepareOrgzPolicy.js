import getUserOrgzPolicy from "#@/api/atlas/services/getUserOrgzPolicy.js";
import setFeedback from "#@/services/setFeedback.js";
import getModelService from "#@/services/getModelService.js";
import { showMessage } from "#@/databases/http_fluentd.js";

const prepareOrgzPolicy = async (req, res, next) => {
    const model = getModelService(req);

    try {
        const payload = await getUserOrgzPolicy(model.cid, model.ctype);
        model.payload = payload;
        return next();
    }
    catch (error) {
        showMessage(error);
        return res.status(500).json(setFeedback(req.feedback, false));
    }
}

export default prepareOrgzPolicy;