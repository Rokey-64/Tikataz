// api.js
import axios from "axios";

//const URL = 'http://127.0.0.1:8000/'
const URL = process.env.REACT_APP_API_URL;

/**
|--------------------------------------------------
| GET CATALOGS
|--------------------------------------------------
*/
const fetchCatalogsAPI = (urlTail) => {
    return axios.get(URL)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching catalogs:", error);
            throw error;
        });
};

export default fetchCatalogsAPI;
/**
|--------------------------------------------------
| GET TITLES
|--------------------------------------------------
*/
export const fetchTitlesAPI = (urlTail) =>{
    return axios.get(`${URL}catlg${urlTail}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching catalogs:", error);
        throw error;
    });
};

/**
|--------------------------------------------------
| GET CONTENT
|--------------------------------------------------
*/
export const fetchContentAPI = (urlTail) =>{
    return axios.get(`${URL}content${urlTail}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching catalogs:", error);
        throw error;
    });
};

/**
|--------------------------------------------------
| ADD NEW AN ARTICLE
|--------------------------------------------------
*/
export const postArticlesAPI = async (value) =>{
    return axios.post(`${URL}editors/`, value) //http://localhost:8000/editors/
    .catch(
        error =>{
            console.error("Error fetching catalogs:", error);
            throw error;
        }
    )
}