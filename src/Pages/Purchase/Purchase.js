import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import { useParams } from 'react-router';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import useSwal from '../../hooks/useSwal';
import useAuth from '../../hooks/useAuth';
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'

const Purchase = () => {
    const { swalReturnSuccess } = useSwal();
    const { user } = useAuth();
    const { _id } = useParams()
    const history = useHistory();
    const [selectedProduct, setSelectedProduct] = useState({})
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        axios.get(`https://shrouded-stream-54821.herokuapp.com/products/${_id}`)
            .then(response => {
                setSelectedProduct(response.data);
                setValue('name', `${user.displayName}`);
                setValue('email', `${user.email}`);
            })
    }, [_id, user.displayName, user.email])

    const onPurchase = (data) => {
        data.status = 'Pending';
        data.productId = _id;
        data.productPrice = selectedProduct.price;
        data.productInfo = selectedProduct.company + ' => ' + selectedProduct.model;
        console.log(data)
        axios.post('https://shrouded-stream-54821.herokuapp.com/orders', data)
            .then(response => {
                reset();
                swalReturnSuccess('Order Successful', 'OK')
                    .then(res => {
                        history.push('/')
                    })
            })
    }
    return (
        <>
            <Header></Header>
            <div className="container mt-5 mb-5">
                <Row xs={1} md={2} className='shadow-lg p-2 bg-body rounded'>
                    <Col>
                        <Card>
                            <Card.Img className='img-fluid' variant="top" src={selectedProduct.img} />
                            <Card.Body>
                                <Card.Title>{selectedProduct.company}</Card.Title>
                                <Rating
                                    className='text-warning'
                                    initialRating={selectedProduct.rating}
                                    readonly
                                    emptySymbol="far fa-star"
                                    fullSymbol="fas fa-star"
                                />
                                <Card.Text>
                                    {selectedProduct.model}
                                </Card.Text>
                                <Card.Text as="h5">
                                    Cost: from {selectedProduct.price}€
                                </Card.Text>
                                <Card.Text>
                                    {selectedProduct.details}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <h3 className="text-center">Shipping Address</h3>
                        <form onSubmit={handleSubmit(onPurchase)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input {...register("name", { required: true })}
                                    type="text" className="form-control" id="name" />
                                {errors.name && <span className='text-danger'>Name is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input {...register("email", { required: true })}
                                    type="email" className="form-control" id="email" />
                                {errors.email && <span className='text-danger'>Email is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telephone" className="form-label">Mobile Number</label>
                                <input {...register("telephone", { required: true })}
                                    type="number" className="form-control" id="telephone" />
                                {errors.telephone && <span className='text-danger'>Mobile Number is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="street" className="form-label">Street/House No.</label>
                                <input {...register("street", { required: true })}
                                    type="text" className="form-control" id="street" />
                                {errors.street && <span className='text-danger'>Street/House No is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input {...register("city", { required: true })}
                                    type="text" className="form-control" id="city" />
                                {errors.city && <span className='text-danger'>City is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zip" className="form-label">Post Code</label>
                                <input {...register("zip", { required: true })}
                                    type="number" className="form-control" id="zip" />
                                {errors.zip && <span className='text-danger'>Post Code is required</span>}
                            </div>
                            <div className="mb-3">
                                <input className='btn btn-outline-secondary' type="submit" value="Place Order" />
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Purchase;