import axios from 'axios';
import Token from '../components/Token';

export default axios.create({
    baseURL: "http://api.ajokeelewu.loc",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'mine' : Token,
     },
    withCredentials: true,
});