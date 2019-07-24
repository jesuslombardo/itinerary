import axios from 'axios';

export default axios.create({
    baseURL: 'https://dev-api.shipwell.com',
    headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Cache-Control': 'no-cache'
        }
});