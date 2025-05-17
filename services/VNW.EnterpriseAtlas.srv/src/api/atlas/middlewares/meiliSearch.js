import setFeedback from '#@/services/setFeedback.js'
import getModelService from '#@/services/getModelService.js'
import { showMessage } from '#@/databases/http_fluentd.js'
import { MeiliSearch } from 'meilisearch'

/**
 * Utility function to handle MeiliSearch requests
 * @param {string} index - The index to search in.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const meiliSearch = async (req, res, next) => {
    const model = getModelService(req);
    const limit = 10;
    const page = Number(model?.p);
    const offset = (isNaN(page) ? 0 : page) * limit;

    const search = model.q;
    if (!search) {
        return next();
    }

    const meiliClient = new MeiliSearch({
        host: process.env.MEILI_HOST,
        apiKey: process.env.MEILI_API_KEY,
    });

    const index = meiliClient.index('tags');

    const result = await index.search(search, {
        limit: limit,
        offset: offset,
        attributesToRetrieve: ['id'],
    })
    if (!result || result.hits.length === 0) {
        return next();
    }

    model.searchCIDs = result.hits.map((item) => {
        return item.id;
    });

    return next();
}

export default meiliSearch;