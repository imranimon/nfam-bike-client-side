import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import useSwal from '../../hooks/useSwal';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import Product from '../Shared/Product/Product';

const Collections = () => {
    const { startLoading, stopLoading } = useSwal();
    const [products, setProducts] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    useEffect(() => {
        axios.get('https://shrouded-stream-54821.herokuapp.com/products')
            .then(response => {
                setProducts(response.data)
                setDataLoading(false)
            })
    }, [])
    return (
        <>
            <Header></Header>
            <div className='container my-4'>
                <Row xs={1} md={2} className='mb-5'>
                    <Col className='d-flex justify-content-center'>
                        <div>
                            <img className='img-fluid' src="https://i.ibb.co/djhY31c/645156-rennrad.jpg" alt="" />
                        </div>
                    </Col>
                    <Col>
                        <h3 >A New Cycling Experience</h3>
                        <p className='text-secondary'>An electric bike opens up horizons: faster and more comfortable on the go, new possibilities for touring and everyday life, sporty aspects such as a more even load or the uphill flow, riding with a trailer ... good reasons for the e-bike - and the list goes on and on ! An e-bike, also known as a pedelec, is characterized by a supporting electric drive up to a speed of 25 km / h. This switches on power as soon as you step on the pedals - the additional power can be regulated as required and desired.</p>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <h3><span className="border border-2 p-2 rounded">Available Bikes</span></h3>
                </Row>
                <Row className="g-4" xs={1} md={3}>
                    {
                        dataLoading ? startLoading('Products Loading') : stopLoading()
                    }
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                        >
                        </Product>)
                    }
                </Row>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Collections;