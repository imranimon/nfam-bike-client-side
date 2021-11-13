import axios from 'axios';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import useSwal from '../../../../hooks/useSwal';

const MakeAdmin = () => {
    const { user } = useAuth()
    const { swalConfirmation, swalWarning, swalSuccess, } = useSwal()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onMakeAdmin = (data) => {
        data.requester = user.email
        swalConfirmation('Make Admin')
            .then(response => {
                if (response.isConfirmed) {
                    axios.put('http://localhost:5000/users/admin', data)
                        .then((response) => {
                            if (response.data.modifiedCount) {
                                swalSuccess(`${data.email} is now has Admin rights !!`)
                                reset()
                            } else {
                                swalWarning('Either user does not have Admin rights or Requested user does not exist')
                            }
                        }).catch((error) => {
                            swalWarning('Something went wrong')
                        })
                }
            })

    }
    return (
        <div className="container">
            <Row className='shadow-lg my-5 p-5 d-flex justify-content-center'>
                <Col xs={12} md={6}>
                    <h2 className='text-center'>Make Admin</h2>
                    <form onSubmit={handleSubmit(onMakeAdmin)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input {...register("email", { required: true })}
                                type="email" className="form-control" id="email" />
                            {errors.email && <span className='text-danger'>Email is required</span>}
                        </div>
                        <div className="mb-3">
                            <input className='btn btn-outline-secondary' type="submit" value="Submit" />
                        </div>
                    </form>
                </Col>
            </Row>

        </div>
    );
};

export default MakeAdmin;