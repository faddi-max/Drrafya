import axios from 'axios';
import { Baseurl, contact } from '../../constant/Basurl';

export async function storeContactDetails(formData) {
    try {
        const response = await axios.post(`${Baseurl}${contact}`, formData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error storing contact details:', error);
        throw error;
    }
}