import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { favoriteImage, unfavoriteImage } from '../api';
import '../styles.css';

const ImageTile = (props) => {
  const [favorited, setFavorite] = useState(props.favorited);
  const { externalId, src, title } = props;

  const toggleFavorite = () => {
    if (favorited) {
      setFavorite(false);
      unfavoriteImage(externalId)
    } else {
      setFavorite(true);
      favoriteImage({ externalId, src, title })
    }
  };

  return (
    <Container className='imageTileContainer'>
      <Row className='imageTileRow'>
        <Image className='imageTile' src={ props.src } rounded fluid />
        <Row className='imageTitle'>
          { favorited ? <AiFillHeart onClick={ () => toggleFavorite(false) }/> : <AiOutlineHeart onClick={ () => toggleFavorite(true) }/> }
          <h6>{ props.title }</h6>
        </Row>
      </Row>
    </Container>
  )
}

ImageTile.propTypes = {
  external_id: PropTypes.string,
  favorited: PropTypes.bool,
  src: PropTypes.string,
  title: PropTypes.string
};

export default ImageTile;
