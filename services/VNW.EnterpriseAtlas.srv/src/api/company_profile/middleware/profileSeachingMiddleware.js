import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import createShortLinkRedis from "../../../services/createShortLinkRedis.js";
import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import createStorageService from "../../../services/strorages/createStorageService.js";
import {GENERATING_COMPANY_LOGO_KEY} from "../../../services/generateRedisKeys.js";
import searchLeaderService from "../services/searchProfileService.js";

/**
 * This middleware is used to get the profile of the company 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const ProfileSeachingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = model?.id || "dkebsheu1sed55a8wwd5+";
    const data = {
        logo: "", nation:{value:"", id:""}, name: "", taxCode: "",
        date: "", address: "", businessField: "", phone: "",
        fax: "", email: "", vision: "", mission: "", id: ""
    };

    try{
        const result = await searchLeaderService(userID);

        if(result.length > 0){
            const profile = result[0];
            data.logo = profile.logo_index;
            data.nation = {value:profile.nation_name, id:profile.nation_id};
            data.name = profile.corp_name;
            data.taxCode = profile.tax_code;
            data.date = profile.register_date;
            data.address = profile.address;
            data.businessField = profile.bussiness_field;
            data.phone = profile.phone_number;
            data.fax = profile.fax;
            data.email = profile.email;
            data.vision = profile.vision;
            data.mission = profile.mission;
            data.id = profile.id;
        }
    }
    catch(err){
        // ⛔ TODO: Log the error here
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    // const containerClient = initContainerCliAzure("images");
    const storageService = createStorageService("images");
    
    // const blobKey = `${req.userID}_company_logo`;
    const blobKey = GENERATING_COMPANY_LOGO_KEY(userID);

    const shortLink = await createShortLinkRedis(blobKey, storageService);
    data.logo = shortLink;

    model.profile = data;
    next();
};

export default ProfileSeachingMiddleware;