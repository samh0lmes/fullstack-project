import { imagesDataReducer } from '../imagesDataReducer';

describe('imagesDataReducer', () => {
  const state = { searchResults: [], error: null };

  describe('when the action is SET_IMAGES_LIST', () => {
    it('sets the search results to the search results returned', () => {
      expect(imagesDataReducer(
        state,
        { type: 'SET_IMAGES_LIST', searchResults: ['some results'] }
      )).toEqual({ searchResults: ['some results'], error: null })
    });
  });

  describe('when the action is SET_ERROR', () => {
    it('sets the error to the error returned', () => {
      expect(imagesDataReducer(
        state,
        { type: 'SET_ERROR', error: 'Uh oh!' }
      )).toEqual({ searchResults: [], error: 'Uh oh!' })
    });
  });
});
