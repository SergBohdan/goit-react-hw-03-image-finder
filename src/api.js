import axios from 'axios';

const API_KEY = '39312156-dd1011ec12002fc77e8376352'; 

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    if (response.data.hits.length === 0) {
      throw new Error('No images found');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching images: ', error);
    throw error;
  }
};