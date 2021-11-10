import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import useSwal from '../../../hooks/useSwal';


const Newsletter = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {swalSuccess} = useSwal();
    const onSubscribe = (data) => {
        swalSuccess(`You will be notified on ${data.email}`)
        reset();
    }
    return (
        <div className="container mt-5 mb-3">
            <Row className='shadow p-2 bg-body rounded'>
                <Col xs={12} md={6} className='d-flex justify-content-center align-items-center'>
                    <div>
                        <h3 style={{color: '#1D1F24'}}>Subscribe To Get Latest Offers</h3>
                        <p>Our e-mail newsletter informs you regularly about<br />the best offer we have.</p>
                        <form onSubmit={handleSubmit(onSubscribe)}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input {...register("email", { required: true })}
                                    type="email" className="form-control" id="email" />
                                {errors.email && <span className='text-danger'>Email is required</span>}
                            </div>
                            <p>I have read the privacy policy and accept it.</p>
                            <div className="mb-3">
                                <input className='btn btn-outline-secondary' type="submit" value='Subscribe' />
                            </div>
                        </form>
                    </div>

                </Col>
                <Col xs={12} md={6}>
                    <img src="https://i.ibb.co/pwzjbLv/4890608.jpg" alt="" className='img-fluid' />
                </Col>
            </Row>
        </div>

    );
};

export default Newsletter;