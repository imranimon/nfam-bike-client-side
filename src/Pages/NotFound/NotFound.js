import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    return (
        <div className='Container d-flex justify-content-center bg-404'>
            <div>
                <div className='d-flex justify-content-center'>
                    <Link to='/home' className='fs-2' style={{color:'#1D1F24'}}>
                        Back To Home
                    </Link>
                </div>
                <div>
                    <img className='img-fluid' src="https://i.ibb.co/wzM3VQ7/404-fehler-page-seiten-titel.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default NotFound;