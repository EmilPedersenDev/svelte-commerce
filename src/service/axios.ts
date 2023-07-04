import axios from 'axios';
import {PUBLIC_BASE_URL} from '$env/static/public';

const instance = axios.create({
    baseURL: PUBLIC_BASE_URL
});

export default instance;
