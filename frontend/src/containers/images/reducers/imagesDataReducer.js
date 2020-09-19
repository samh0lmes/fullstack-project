export const imagesDataReducer = (state, action) => {
  if (action.type === 'SET_ERROR') {
    return { ...state, searchResults: [], error: true };
  }

  if (action.type === 'SET_IMAGES_LIST') {
    return { ...state, searchResults: action.searchResults, error: null };
  }

  throw new Error();
};
