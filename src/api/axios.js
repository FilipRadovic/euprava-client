import axios from 'axios';
import Qs from "qs";

export const server = axios.create({
    baseURL: 'http://localhost:8000/api/',
    paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
    }
});

server.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';