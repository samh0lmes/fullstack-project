import axios from 'axios';

export const searchImages = (searchTerm) => (
  axios.get(`/api/v1/images/search?search_term=${searchTerm}`)
);

export const favoriteImage = (image) => (
  axios.post(
    '/api/v1/images/favorites',
    {
      image: { src: image.src, title: image.title, external_id: image.externalId }
    }
  )
);

export const unfavoriteImage = (externalId) => (
  axios.delete(`/api/v1/images/favorites/${externalId}`)
);

export const fetchFavorites = () => (
  axios.get('/api/v1/images/favorites')
);
