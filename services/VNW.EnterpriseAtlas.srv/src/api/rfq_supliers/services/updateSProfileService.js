import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Update Supplier Profile Service
 * This service updates the supplier profile based on the provided user ID and payload.
 * @param {*} cid - User ID
 * @param {*} payload - Payload containing the profile details
 * @returns 
 */
const updateSProfileService = async (cid, payload) => {
    try {
        const result = await mysqlConn.query(`call spRFQSupplierProfile(:gCardID, :gCorpNm, :gTaxcode, :gAddress, :gEmail, :gPhone)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gCardID: cid,
                    gCorpNm: payload.companyName.trim(),
                    gTaxcode: payload.taxCode.trim(),
                    gAddress: payload.address.trim(),
                    gEmail: payload.email.trim(),
                    gPhone: payload.phone.trim()
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default updateSProfileService;