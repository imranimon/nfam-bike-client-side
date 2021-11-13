import axios from 'axios';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import useSwal from '../../../../hooks/useSwal';

const AddReview = () => {
    const { user } = useAuth()
    const { swalSuccess, startLoading, stopLoading } = useSwal();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setValue('name', `${user.displayName}`);
    }, [user])

    const onAddReview = (data) => {
        startLoading('Posting Review')
        axios.post('http://localhost:5000/reviews', data)
            .then(response => {
                reset();
            }).finally(() => {
                setValue('name', `${user.displayName}`);
                stopLoading()
                swalSuccess('Review Posted')
            })
    }
    return (
        <div className="container mt-3 mb-3">
            <Row xs={1} md={2} className='p-2 bg-body rounded shadow'>
                <Col>
                    <div>
                        <h3 className="text-center text-danger mt-2">Thanks For Your Valuable Opinion</h3>
                        <img className='img-fluid rounded' src="https://i.ibb.co/FHYgQYd/5803416.jpg" alt="" />
                    </div>
                </Col>
                <Col>
                    <form onSubmit={handleSubmit(onAddReview)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Reviewer</label>
                            <input {...register("name", { required: true })} disabled
                                type="text" className="form-control" id="name" />
                            {errors.name && <span className='text-danger'>Name is required</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rating" className="form-label">Rating</label>
                            <input {...register("rating", { required: true, min: 0, max: 5 })}
                                type="number" className="form-control" id="rating" />
                            {errors.rating && <span className='text-danger'>Rating is required and must be between 0 and 5</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="opinion" className="form-label">Your Opinion</label>
                            <textarea {...register("opinion", { required: true })}
                                className="form-control" id="opinion" rows="3"></textarea>
                            {errors.opinion && <span className='text-danger'>Opinion is required</span>}
                        </div>
                        <div className="mb-3">
                            <input className='btn btn-outline-secondary' type="submit" />
                        </div>
                    </form>
                </Col>
            </Row>

        </div>
    );
};

export default AddReview;