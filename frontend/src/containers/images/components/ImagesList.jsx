import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageTile from './ImageTile';
import '../styles.css';

const ImagesList = (props) => {
  return (
    <Container>
      <Row>
        {
          props.images.map((image) => (
            <Col key={image.external_id} xs={6} md={4}>
              <ImageTile externalId={ image.external_id } src={image.src} title={image.title} favorited={image.favorited}/>
            </Col>
          ))
        }
          </Row>
        </Container>
  )
}

ImagesList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      external_id: PropTypes.string,
      favorited: PropTypes.bool,
      src: PropTypes.string,
      title: PropTypes.string,
    })
  )
};

export default ImagesList;
