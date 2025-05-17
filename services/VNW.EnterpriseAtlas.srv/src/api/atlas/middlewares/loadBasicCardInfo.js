import setFeedback from '#@/services/setFeedback.js'
import getModelService from '#@/services/getModelService.js'
import { showMessage } from '#@/databases/http_fluentd.js'
import AutomationCardService from '../services/card_base/automationCardService.js'
import ManualCardService from '../services/card_base/manualCardService.js'
import countRatingService from '../services/card_rating/countRatingService.js'
import countReactionService from '../services/card_reaction/countReactionService.js'
import getCardRewardService from '../services/card_rewards/getCardRewardService.js'
import CommonCardTemplate from '../services/card_base/templateService.js'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const loadBasicCardInfo = async (req, res, next) => {
    const model = getModelService(req);
    const cType_Enum = CommonCardTemplate.ctype;
    const payload = {
        base: [],
        rates: [],
        reactions: [],
        rewards: []
    };

    /**
     * LIMITED_CARD is the maximum number of cards to be returned in the response.
     * It is set to 10 by default.
     */
    const LIMITED_CARD = 10;

    /**
     * * Get the previous card id from the request
     * * @param {string} preCID - The previous card id to be used for pagination
     */
    const preCID = model.cid || '';

    /**
     * * * Get the card type from the request
     */
    const cardType = model.ctype ? cType_Enum[model.ctype.toLowerCase()] : undefined;
    if (!cardType) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        /**
         * A flag to mask data source
         * Switch to automation card service if the number of maual cards is insufficient
         */
        let ctypeRedirect = false;

        /**
         * Try to get the card data from the manual card service first
         * If the number of cards is less than the limit, mark ctypeRedirect as true
         */
        if (cardType === cType_Enum.manual) {
            const obj = new ManualCardService();
            const result = await obj
                .getProfile()
                .getLogo()
                .getLocation()
                .getPartners()
                .getProducts()
                .getWorkingTime()
                .getCerts()
                .run(cardType === cType_Enum.manual ? preCID : "", LIMITED_CARD, undefined, model.searchCIDs);

            if (result && result.length > 0) {
                if (result.length < LIMITED_CARD) {
                    ctypeRedirect = true;
                }

                if (result.length > 0) {
                    payload.base = result;
                }
            }
            else {
                ctypeRedirect = true;
            }
        }

        /**
         * * If the card type is 'auto' or ctypeRedirect is true, use the automation card service
         * * to get the card data.
         */
        if (cardType === cType_Enum.auto || ctypeRedirect) {

            /**
             * * Get the major from the request and split it into an array
             */
            const majs = model.majs;

            /**
             * * An array to store the major values
             * * @param {Array} predicts - An array to store the major values
             */
            const predicts = [];
            if (majs) {
                majs.split(',').forEach((item) => {
                    if (item) {
                        predicts.push(item.trim());
                    }
                });
            }

            const obj = new AutomationCardService();
            const NEW_LIMITED_CARD = LIMITED_CARD - payload.base.length;
            const result = await obj
                .getProfile()
                .getLogo()
                .getLocation()
                .getPartners()
                .getProducts()
                .getWorkingTime()
                .getCerts()
                .run(cardType === cType_Enum.auto ? preCID : "", NEW_LIMITED_CARD, predicts, model.searchCIDs);

            if (result && result.length > 0) {
                payload.base = [...payload.base, ...result];
            }
        }


        /**
         * * Check if the result is null or undefined
         */
        if (payload.base.length === 0) {
            return res.status(404).json(setFeedback(req.feedback, false));
        }

        /**
         * * Prepare the card ids for the next step
         */
        const cids = payload.base.map((item) => item.cid);

        /**
         * * * Get the rating and reaction data for the card ids
         */
        payload.rates = await countRatingService(cids);
        payload.reactions = await countReactionService(cids);

        /**
         * Prepare the user ids for the next step
         * * @param {Array} result - The result array containing user ids
         * * @param {Set} uids - A set containing user ids to be excluded
         */
        const uids = new Set();
        for (const card of payload.base) {
            if (card.uid && !uids.has(card.uid)) {
                uids.add(card.uid);
            }
        }

        /**
         * * Get the rewards for the user ids to display it in the card
         */
        const rewards = await getCardRewardService(JSON.stringify([...uids]));
        payload.rewards = rewards;
    }
    catch (error) {
        showMessage("findCardMiddleware:", error);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    model.payload = payload;
    return next();
}

export default loadBasicCardInfo;