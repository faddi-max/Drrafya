import axios from 'axios';
import {Baseurl, getallcategoryblogsbyslug} from '../../constant/Basurl.jsx';

export async function getallcategoriesbyslug(slug, page = 1) {
    try {
        const response = await axios.get(
            `${Baseurl}${getallcategoryblogsbyslug}${slug}?page=${page}`
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}