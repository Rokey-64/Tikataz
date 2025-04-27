import _AutoCardModel from "../models/atoCardModel.js";
import mongoose from "mongoose";

/**
 * Get Supplier Profile Service
 * This service retrieves the profile of a supplier based on the user ID.
 * @param {*} uid - User ID
 * @param {*} cid - Card ID
 * @returns 
 */
const getSProfileService = async (uid, cid) => {
    try {
        let result = null;
        if (uid){
            result = await getSProfileFromMysql(uid);
        }
        else {
            result = await getSProfileFromMongo(cid);
        }

        return result;
    }
    catch (err) {
        throw err;
    }
}

const getSProfileFromMysql = async () => {
    try {
        const result = await mysqlConn.query("call spGetCommonProfile(:gUserID)", {
            type: QueryTypes.RAW,
            replacements: { gUserID: uid }
        });

        return result;
    }
    catch (err) {
        throw err;
    }
}

const getSProfileFromMongo = async (cid) => {
    try {
        const result = await _AutoCardModel.findOne(
            { _id: new mongoose.Types.ObjectId(String(cid)) },
            {
                contact: 1,
                company: 1,
            }
        ).lean();

        return result;

    } catch (err) {
        return err;
    }
}

export default getSProfileService;