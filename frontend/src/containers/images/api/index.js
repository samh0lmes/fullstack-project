import axios from 'axios';

export const searchImages = (searchTerm) => {
  return axios.get(`/api/v1/images/search?term=${searchTerm}`)
}
