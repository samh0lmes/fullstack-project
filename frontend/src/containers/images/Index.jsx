import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import SearchForm from './forms/SearchForm';
import ImagesList from './components/ImagesList';
import { imagesDataReducer } from './reducers/imagesDataReducer';
import { fetchFavorites } from './api';
import './styles.css';

export default () => {
  const [searchResults, setSearchResults] = useState([]);
  const [data, dispatch] = useReducer(imagesDataReducer, { searchResults, error: null });

  const handleViewFavorites = () => {
    fetchFavorites()
      .then(response => {
        dispatch({ type: 'SET_IMAGES_LIST', searchResults: response.data.images });
      })
      .catch((error) => {
        dispatch({ type: 'SET_ERROR', error: error.response.data.message });
      });
  }

  useEffect(() => (
    setSearchResults(data.searchResults)
  ), [data.searchResults]);

  if (!searchResults.length) {
    return (
      <Jumbotron fluid>
        <Container className='initialSearchForm'>
          <h1>Everlywell Image Catalog</h1>
          <Row>
            <SearchForm setSearchResults={ (searchTerm) => setSearchResults(searchTerm) } searchResults={ searchResults }/>
          </Row>
        </Container>
      </Jumbotron>
    )
  }

  return (
    <Container>
      <Row>
        <SearchForm setSearchResults={ (searchTerm) => setSearchResults(searchTerm) } searchResults={ searchResults }/>
        <Button variant="primary" onClick={ () => handleViewFavorites() }>View Favorites</Button>
      </Row>
      <ImagesList images={ searchResults } />
    </Container>
  );
};
