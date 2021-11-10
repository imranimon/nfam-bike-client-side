import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import useSwal from '../../../hooks/useSwal';
import Product from '../../Shared/Product/Product';

const Products = () => {
    const { startLoading, stopLoading } = useSwal();
    const [products, setProducts] = useState([])
    const [dataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        axios.get('https://shrouded-stream-54821.herokuapp.com/products?limit=6')
            .then(response => {
                setProducts(response.data)
                setDataLoading(false)
            })
    }, [])
    return (
        <div className="container my-3">
            {
                dataLoading ? startLoading('Products Loading') : stopLoading()
            }
            <Row className="text-center text-white bg-secondary">
                <h2>EXPLORE OUR BIKES</h2>
            </Row>
            <Row className="mt-3 g-4" xs={1} md={3}>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    >
                    </Product>)
                }
            </Row>
        </div>
    );
};

export default Products;