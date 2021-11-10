import React from 'react';
import './Banner.css'
import { Carousel } from 'react-bootstrap';

const Banner = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/PttsYPy/645135-mountainbikes.jpg"
                        alt="bike in roll"
                    />
                    <Carousel.Caption>
                        <h3 >Mountain Bikes: Have Fun Off-Road</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/GsZ6M4H/630283-ebikes.jpg"
                        alt="bike outdoor"
                    />

                    <Carousel.Caption >
                        <h3>E-bike: A New Cycling Experience</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default Banner;