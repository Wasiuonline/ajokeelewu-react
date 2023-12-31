import axios from 'axios';
import Token from '../components/Token';
import BaseURL from '../components/BaseURL';

export default axios.create({
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'mine' : Token,
     },
    withCredentials: true,
});