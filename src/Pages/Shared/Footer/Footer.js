import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Footer.css'
import footerImage from '../../../images/footer1.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-footer p-2'>
            <Row className='w-100'>
                <Col md={4} sm={12} >
                    <img className='img-fluid rounded' src={footerImage} alt="" />
                </Col>
                <Col md={8} sm={12}>
                    <Row>
                        <Col md={4} sm={12}>
                            <h5>Contact</h5>
                            <ul>
                                <li>Hotline: +49 (0) 2689 00 8</li>
                                <li>Monday - Friday 8:00 a.m. - 6:00 p.m.</li>
                                <li>Saturday 9:00 a.m. - 1:00 p.m.</li>
                            </ul>
                        </Col>
                        <Col md={4} sm={12}>
                            <h5>NFam Bike</h5>
                            <ul className='footer-links'>
                                <li><Link to='#'>Conditions</Link></li>
                                <li><Link to='#'>Conditions</Link></li>
                                <li><Link to='#'>Data Protection</Link></li>
                                <li><Link to='#'>COVID-19</Link></li>
                                <li><Link to='#'>Imprint</Link></li>
                                <li><Link to='#'>Cookie Setting</Link></li>
                                <li><Link to='#'>About US</Link></li>
                                <li><Link to='#'>Shipping</Link></li>
                                <li><Link to='#'>Payment Methods</Link></li>
                            </ul>
                        </Col>
                        <Col md={4} sm={12}>
                            <h5>Service</h5>
                            <div className='footer-links'>
                                <ul className='footer-links'>
                                    <li><Link to='#'>FAQ(Frequently Asked Questions)</Link></li>
                                    <li><Link to='#'>Wish Box</Link></li>
                                    <li><Link to='#'>Disposal Information for Batteries</Link></li>
                                    <li><Link to='#'>Best Price Guarantee</Link></li>
                                    <li><Link to='#'>Returns</Link></li>
                                    <li><Link to='#'>Newsletter</Link></li>
                                    <li><Link to='#'>Help & Service</Link></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;