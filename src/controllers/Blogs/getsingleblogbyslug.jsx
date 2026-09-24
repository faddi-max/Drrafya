import axios from 'axios';
import {Baseurl, getsingleblogbyslug} from '../../constant/Basurl.jsx';


export async function getsingleblogpostbyslug(slug){
    try {
        const response = await axios.get(`${Baseurl}${getsingleblogbyslug}${slug}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

