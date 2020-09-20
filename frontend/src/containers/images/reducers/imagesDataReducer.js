export const imagesDataReducer = (state, action) => {
  if (action.type === 'SET_ERROR') {
    return { ...state, searchResults: [], error: action.error };
  }

  if (action.type === 'SET_IMAGES_LIST') {
    return { ...state, searchResults: action.searchResults, error: null };
  }

  throw new Error();
};
