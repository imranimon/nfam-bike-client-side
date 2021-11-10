import React from 'react';
import Banner from './Banner/Banner'
import Newsletter from './Newsletter/Newsletter'
import Products from './Products/Products';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;