import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * * * Save basic settings for a user
 * * @param {string} uid - The user ID
 * * @param {string} theme - The theme preference
 * * @param {string} lang - The language ID preference
 * * @param {string} timezone - The timezone ID preference
 * @returns 
 */
const saveBasicSettingService = async ({uid, theme, lang, timezone}) => {
    try {
        const result = await mysqlConn.query(`CALL spSaveSettingsBasic(:gUserID,:gTheme,:gLang_id,:gTimezone_id)`, {
            type: QueryTypes.RAW,
            replacements: {
                gUserID: uid,
                gTheme: theme,
                gLang_id: lang,
                gTimezone_id:timezone
            }
        });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default saveBasicSettingService;