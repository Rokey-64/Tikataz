import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const axiosInstance = axios.create({
    baseURL: API_HOST,
    withCredentials: true,
    validateStatus: status => status === 401 || status === 200,
    withCredentials: true
  });

axiosInstance.interceptors.response.use(
    response => {
       if(response.status === 401){
            // window.dispatchEvent(new Event("unauthorized"));
       }

       return response;
    }
    , error => {
        // Handle error response
        return Promise.reject(error);
    }
);

export default axiosInstance;