/**
 * This service is responsible for extracting the model from the request object.
 * @param {*} req - The request object.
 * @returns 
 */
const getModelService = (req) =>{
    if(req.method === 'GET') return req.query;
    if(req.method === 'POST') return req.body;
}

  export default getModelService;