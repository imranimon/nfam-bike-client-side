import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router';
import { useForm } from "react-hook-form";
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const SignUp = () => {
    const prevLocation = useLocation();
    const redirect_url = prevLocation.state?.from || '/';
    const history = useHistory()
    const { signInUsingGoogle, setIsLoading, logOut, saveUser,
        createNewUser, setUserName, setError, error } = useAuth()
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
            .finally(() => setIsLoading(false))
    }
    const onCreateNewUser = (data) => {
        createNewUser(data.email, data.password)
            .then((result) => {
                setUserName(data.name)
                    .then((res) => {
                        saveUser(data.email, data.name, 'POST')
                    }).catch((error) => {
                        setError(error.message);
                    });
                logOut()
                    .then(() => {
                        history.push('/signIn')
                    })
                    .catch((error) => {
                        setError(error.message);
                    })
                    .finally(() => setIsLoading(false))
                reset();
            })
            .catch((error) => {
                setError(error.message);
            });
    }
    return (<>
        <Header></Header>
        <div className='container mt-1'>
            <Row className='p-3 mb-5 bg-body rounded'>
                <Col xs={12} md={6}>
                    <h3 className='bg p-2 text-center'>Please Sign-Up</h3>
                    <img style={{ maxHeight: '500px' }} className='img-fluid'
                        src='https://i.ibb.co/hfbcQxy/Active-people-on-bikes-windmills-and-house-with-solar-panel-on-rooftop-flat-vector-illustration-Cart.jpg' alt="" />
                </Col>
                <Col xs={12} md={5}>
                    <div className='mb-2'>
                        <form onSubmit={handleSubmit(onCreateNewUser)}>
                            {error !== '' && <span className='text-danger'>{error}</span>}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input  {...register("name", { required: true })}
                                    type="text" className="form-control" id="name" />
                                {errors.name && <span className='text-danger'>Name is required</span>}
                            </div>
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
                                <input className='btn btn-outline-secondary' type="submit" value="Sign-Up" />
                            </div>
                        </form>
                    </div>
                    <div className='d-inline'>
                        <button onClick={handleSignIn} className='btn btn-outline-secondary'>
                            <i className="fab fa-google me-1"></i>Sign-Up Using Google</button>
                    </div>
                    <span className='ms-2'>
                        Already Signed-Up?
                        <Link className='ms-1' to='/signIn'>Sign-In</Link>
                    </span>
                </Col>
            </Row>
        </div>
        <Footer></Footer>
    </>
    );
};

export default SignUp;