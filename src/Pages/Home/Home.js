import React from 'react';
import Banner from './Banner/Banner'
import Newsletter from './Newsletter/Newsletter'
import Products from './Products/Products';
import Reviews from './Reviews/Reviews';
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <Products></Products>
            <Reviews></Reviews>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default Home;