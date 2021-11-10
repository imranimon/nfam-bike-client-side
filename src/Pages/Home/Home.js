import React from 'react';
import Banner from './Banner/Banner'
import Newsletter from './Newsletter/Newsletter'
import Products from './Products/Products';
import Reviews from './Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Reviews></Reviews>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;