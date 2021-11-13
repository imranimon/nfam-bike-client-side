import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './AddProduct.css'
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import useSwal from '../../../../hooks/useSwal';

const AddProduct = () => {
    const { swalReturnSuccess, startLoading, stopLoading } = useSwal();
    const history = useHistory();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onAddNewProduct = (serviceData) => {
        startLoading('Adding New Service')
        const imgData = new FormData();
        imgData.append("file", serviceData.img[0])
        imgData.append("upload_preset", "imranimon")
        imgData.append("cloud_name", "dwqqql7tm")
        axios.post('https://api.cloudinary.com/v1_1/dwqqql7tm/image/upload', imgData)
            .then(response => {
                serviceData.img = response.data.secure_url
                axios.post('https://shrouded-stream-54821.herokuapp.com/products', serviceData)
                    .then(response => {
                        reset();
                        stopLoading()
                        swalReturnSuccess('New Product Added', 'To Dashboard')
                            .then(response => {
                                if (response.isConfirmed) {
                                    history.push('/dashboard')
                                }
                            })
                    })
            }).finally(() => {
                stopLoading()
            })
    }
    return (
        <div className="container mt-3 mb-3">
            <Row xs={1} md={2} className='shadow-lg p-2 bg-body rounded'>
                <Col className="img-col-bg">
                    <div>
                        <h3 style={{ color: '#F85124' }} className="text-center mt-5">Add A New Product</h3>
                        <img className='img-fluid rounded' src="https://i.ibb.co/z80d0Y7/60294-O9-KVNF-372.jpg" alt="" />
                    </div>
                </Col>
                <Col>
                    <form onSubmit={handleSubmit(onAddNewProduct)}>
                        <div className="mb-3">
                            <label htmlFor="company" className="form-label">Company Name</label>
                            <input {...register("company", { required: true })}
                                type="text" className="form-control" id="company" />
                            {errors.company && <span className='text-danger'>Company Name is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="model" className="form-label">Model</label>
                            <input {...register("model", { required: true, maxLength: 35 })}
                                type="text" className="form-control" id="model" />
                            {errors.model && <span className='text-danger'>Model is required and maximum 35 characters are allowed</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Cost €</label>
                            <input {...register("price", { required: true })}
                                type="number" className="form-control" id="price" />
                            {errors.price && <span className='text-danger'>Cost is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rating" className="form-label">Initial Rating</label>
                            <input {...register("rating", { required: true, min: 0, max: 5 })}
                                type="number" className="form-control" id="rating" />
                            {errors.rating && <span className='text-danger'>Initial Rating is required and must be between 0 and 5</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="img" className="form-label">Image</label>
                            <input {...register("img", { required: true })}
                                type="file" className="form-control" id="img" />
                            {errors.img && <span className='text-danger'>Image is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="details" className="form-label">Short Description</label>
                            <textarea {...register("details", { required: true })}
                                className="form-control" id="details" rows="3"></textarea>
                            {errors.details && <span className='text-danger'>Description is required</span>}
                        </div>
                        <div className="mb-3">
                            <input className='btn btn-outline-secondary' type="submit" value="Add Product" />
                        </div>
                    </form>
                </Col>
            </Row>

        </div>
    );
};

export default AddProduct;