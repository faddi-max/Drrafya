import axios from 'axios';
import {Baseurl, Getallcategories} from '../../constant/Basurl.jsx';

export async function getallcategories(){
    try {
        const response = await axios.get(`${Baseurl}${Getallcategories}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}