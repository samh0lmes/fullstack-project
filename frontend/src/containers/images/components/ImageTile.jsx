import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import '../styles.css';

const ImageTile = (props) => {
  return (
    <Container>
      <Row>
        <Image src={ props.src } rounded fluid />
        <h3>{ props.title }</h3>
      </Row>
    </Container>
  )
}

ImageTile.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string
};

export default ImageTile;
