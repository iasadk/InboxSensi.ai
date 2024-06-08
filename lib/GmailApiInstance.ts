import axios from "axios";
import { getToken } from './utils';
const GmailApiInstance = axios.create({
    // baseURL: "https://api.amourtrendss.com/"
    baseURL: "https://gmail.googleapis.com/gmail/v1/users/me"
});

GmailApiInstance.interceptors.request.use(
    async (config) => {
        const tk = await getToken();
        if (tk) {
            config.headers.authorization = 'Bearer ' + tk;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default GmailApiInstance;