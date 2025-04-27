// import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import createStorageService from "../../../services/strorages/createStorageService.js";
import createShortLinkRedis from "../../../services/createShortLinkRedis.js";
import { GENERATING_CARD_LOGO_KEY } from "../../../services/generateRedisKeys.js";

/**
 * Set the default data for the inline cards after loading them from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const setInlineCardDefaultData = async (req, res, next) => {
    /**
     * Modify by LINH on 04-03-2025
     * Description: Use the storage service to create short link instead of the azure storage client directly.
     * 
     * // const containerClient = initContainerCliAzure('images');
     */
    const storageService = createStorageService('images');
    const cards = req.inlineCards;
    const stardardCards = [];
    const query = `"userID"='${req.userID}' AND "type"='logo' AND "kind"='cards'`;

    /**
     * Convert the card state to readable status for frontend
     * @param {*} card 
     * @returns 
     */
    const convertCardState = (card) => {
        if (card.state === "approved") {
            return "inline_cards_approved";
        }
        else if (card.state === "pending") {
            return "inline_cards_pending";
        }
        else {
            return "inline_cards_rejected";
        }
    }

    /**
     * Convert and get a date from the card
     * @param {*} card 
     * @returns 
     */
    const getDatetime = (card) => {
        if (!card?.createdAt) return "";

        const date = new Date(card.createdAt);
        if (!(date instanceof Date) || isNaN(date)) return "";

        const convertDate = date.toISOString().split("T")[0]
        return convertDate;
    }


    /**
     * Create the default data for the inline cards
     */
    for (const card of cards) {
        // const blobKey = `${card._id}-logo-logo`;
        const blobKey = GENERATING_CARD_LOGO_KEY(card._id);
        let shortLink = await createShortLinkRedis(blobKey, storageService);

        const status = convertCardState(card);
        const createdAt = getDatetime(card);

        stardardCards.push({
            _id: card._id,
            status: status,
            general: {
                logo: shortLink,
                branchName: card.general.branchName,
                description: card.general.description
            },
            createdAt: createdAt,
            mode: "published",
            rate: "100👍 - 3.5✨ - 35✍",
            RFQ: "1000 / 200 (10%)"
        });
    }

    req.stardardCards = stardardCards;
    next();
}

export default setInlineCardDefaultData;