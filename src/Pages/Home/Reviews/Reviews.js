import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import useSwal from '../../../hooks/useSwal';
import Review from '../Review/Review'

const Reviews = () => {
    const { startLoading, stopLoading } = useSwal();
    const [reviews, setReviews] = useState([])
    const [dataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:5000/reviews')
            .then(response => {
                setReviews(response.data)
                setDataLoading(false)
            })
    }, [])
    return (
        <div className="container mt-5">
            {
                dataLoading ? startLoading('Products Loading') : stopLoading()
            }
            <Row className="text-center text-white bg-secondary">
                <h2>Customer's Opinions About Us</h2>
            </Row>
            <Row className="mt-1 g-4" xs={1} md={3} lg={4}>
                {
                    reviews.map(review => <Review
                        key={review._id}
                        review={review}>
                    </Review>)
                }
            </Row>
        </div>
    );
};

export default Reviews;