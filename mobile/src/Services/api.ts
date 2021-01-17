import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.160.0.16:3333'
})

export default api;