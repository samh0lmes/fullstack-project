import React from 'react';
import PropTypes from 'prop-types';
import { useState, useReducer, useEffect } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { imagesDataReducer } from '../reducers/imagesDataReducer';
import { searchImages } from '../api';
import '../styles.css';

const SearchForm = (props) => {
  const { searchResults, setSearchResults } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [data, dispatch] = useReducer(imagesDataReducer, { searchResults, error: null });

  const handleSubmit = () => {
    searchImages(searchTerm)
      .then(response => {
        dispatch({ type: 'SET_IMAGES_LIST', searchResults: response.data.images });
      })
      .catch((error) => {
        dispatch({ type: 'SET_ERROR', error: error.response.data.message });
      });
  }

  // submit form when user hits enter
  const handleKeyPress = (target) => {
    const enterCharCode = 13;
    if (target.charCode === enterCharCode) {
      handleSubmit()
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => (
    setSearchResults(data.searchResults)
  ), [data.searchResults]);

  return (
    <Container className='searchForm'>
      <FormControl
        className='searchTermInput'
        placeholder="Get creative :)"
        aria-label="Enter a search term"
        aria-describedby="searchTerm"
        onChange={ handleSearchInputChange }
        onKeyPress={ (e) => handleKeyPress(e) }
      />
      <Button onClick={ handleSubmit }>Search</Button>
      {data.error && <div className="error">{ data.error }</div>}
    </Container>
  );
}

SearchForm.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      external_id: PropTypes.string,
      favorited: PropTypes.bool,
      src: PropTypes.string,
      title: PropTypes.string,
    })
  )
};

export default SearchForm;
