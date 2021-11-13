import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const SignIn = () => {
    const { signInUsingGoogle, setIsLoading,
        setError, error, manualSignIn, saveUser } = useAuth()
    const prevLocation = useLocation();
    const redirect_url = prevLocation.state?.from || '/';
    const history = useHistory()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        setError('')
    }, [])

    const handleSignIn = () => {
        signInUsingGoogle()
            .then(result => {
                const user = result.user
                saveUser(user.email, user.displayName, 'PUT')
                history.push(redirect_url)
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false))
    }

    const onManualSignIn = (data) => {
        manualSignIn(data.email, data.password)
            .then(result => {
                history.push(redirect_url)
                reset();
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false))
    }
    return (
        <>
            <Header></Header>
            <div className='container mt-1'>
                <Row className='p-3 mb-5 bg-body rounded'>
                    <Col xs={12} md={6} className='shadow-sm'>
                        <h3 className='bg p-2 text-center'>Please Sign-In</h3>
                        <img style={{ maxHeight: '500px' }} className='img-fluid' src='https://i.ibb.co/hfbcQxy/Active-people-on-bikes-windmills-and-house-with-solar-panel-on-rooftop-flat-vector-illustration-Cart.jpg' alt="" />
                    </Col>
                    <Col xs={12} md={5}>
                        <div className='mb-2'>
                            <form onSubmit={handleSubmit(onManualSignIn)}>
                                {error !== '' && <span className='text-danger'>{error}</span>}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input {...register("email", { required: true })}
                                        type="email" className="form-control" id="email" />
                                    {errors.email && <span className='text-danger'>Email is required</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input {...register("password", { required: true })}
                                        type="password" className="form-control" id="password" />
                                    {errors.password && <span className='text-danger'>Password is required</span>}
                                </div>
                                <div className="mb-3">
                                    <input className='btn btn-outline-secondary' type="submit" value="Sign-In" />
                                </div>
                            </form>
                        </div>

                        <div className='d-inline'>
                            <Button onClick={handleSignIn} variant='outline-secondary'>
                                <i className="fab fa-google me-1"></i>Sign-In Using Google
                            </Button>
                        </div>
                        <span className='ms-2'>
                            New To NFam?
                            <Link className='ms-1' to='/signUp'>Sign-Up</Link>
                        </span>
                    </Col>
                </Row>
            </div>
            <Footer></Footer>
        </>
    );
};

export default SignIn;