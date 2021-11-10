import React from 'react';
import './Product.css'
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';

const Product = (props) => {
    const { _id, company, img, price, model, rating } = props.product;
    return (
        <div>
            <Col>
                <Card className='nfam-animation shadow-lg p-2 bg-body rounded'>
                    <Card.Img className='img-fixed-size' variant="top" src={img} />
                    <Card.Body>
                        <Card.Title>{company}</Card.Title>
                        <Rating
                            className='text-warning'
                            initialRating={rating}
                            readonly
                            emptySymbol="far fa-star"
                            fullSymbol="fas fa-star"
                        />
                        <Card.Text>
                            {model}
                        </Card.Text>
                        <Card.Text as="h5">
                            Price: {price}€
                        </Card.Text>
                        <Link to={`/purchase/${_id}`}>
                            <Button variant='outline-secondary'>Purchase</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default Product;