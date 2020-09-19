import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchForm from './forms/SearchForm';
import ImagesList from './components/ImagesList';
import './styles.css';

export default () => {
  const [searchResults, setSearchResults] = React.useState([]);

  if (!searchResults.length) {
    return (
      <Jumbotron fluid>
        <Container className='initialSearchForm'>
          <h1>Everlywell Image Catalog</h1>
          <Row>
            <SearchForm setSearchResults={ (searchTerm) => setSearchResults(searchTerm) }/>
          </Row>
        </Container>
      </Jumbotron>
    )
  }

  return <ImagesList images={ searchResults } />
};
