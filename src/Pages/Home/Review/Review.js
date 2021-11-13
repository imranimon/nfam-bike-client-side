import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Rating from 'react-rating';

const Review = (props) => {
    const { name, rating, opinion } = props.review
    return (
        <div>
            <Col>
                <Card style={{ height: '200px', overflow: 'auto' }}>
                    <Card.Body>
                        <div className='sticky-top' style={{backgroundColor: 'white'}}>
                            <Card.Title ><i className="far fa-user me-1"></i>{name}</Card.Title>
                            <Rating
                                className='text-warning'
                                initialRating={rating}
                                readonly
                                emptySymbol="far fa-star"
                                fullSymbol="fas fa-star"
                            />
                        </div>

                        <Card.Text>
                            {opinion}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default Review;