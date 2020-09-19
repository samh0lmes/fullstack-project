import React from 'react';
import PropTypes from 'prop-types';
import { useState, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { imagesDataReducer } from '../reducers/imagesDataReducer';
import { searchImages } from '../api';
import './styles.css';

const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [data, dispatch] = useReducer(imagesDataReducer, { searchResults: [], error: null });

  const handleSubmit = () => {
    searchImages(searchTerm)
      .then(response => {
        dispatch({ type: 'SET_IMAGES_LIST', searchResults: response.data });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR' });
      });
  }

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
    props.setSearchResults(data.searchResults)
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
        {data.error && <div className="error">Error</div>}
      </Container>
  );
}

SearchForm.propTypes = {
  setSearchTerm: PropTypes.func.isRequired
}

export default SearchForm;
