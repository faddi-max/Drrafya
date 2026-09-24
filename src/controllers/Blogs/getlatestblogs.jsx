import axios from 'axios';
import { Baseurl, latestblogs } from '../../constant/Basurl';

export async function getlatestblogs() {
    try {
        const response = await axios.get(`${Baseurl}${latestblogs}`);
        console.log(`${Baseurl}${latestblogs}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching latest blogs:', error);
        throw error;
    }
}