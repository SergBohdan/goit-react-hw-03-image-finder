import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com/api";

export const fetchImages = async (value, page) => {
    const resp = await axios.get(`?key=39312156-dd1011ec12002fc77e8376352&q=${value}&page=${page}`);
    return resp.data
}