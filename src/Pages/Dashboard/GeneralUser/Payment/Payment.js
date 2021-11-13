import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Paypal from '../Paypal/Paypal';
import paypalImg from '../../../../images/paypal.png'
import useSwal from '../../../../hooks/useSwal';

const Payment = () => {
    const { swalSuccess } = useSwal()
    const [checkout, setCheckout] = useState(false)
    const handlePaymentRequest = () => {
        setCheckout(true)
    }
    return (
        <div className="mt-3">
            {checkout ?
                <Paypal setCheckout={setCheckout}>
                </Paypal>
                : <Row className="Container d-flex justify-content-center">
                    <Col xs={12} md={6} className="shadow p-4 d-flex justify-content-center">
                        <div>
                            <h4 className="mb-3">Checkout Through Paypal</h4>
                            <img height='100px' src={paypalImg} alt="" />
                            <Button onClick={handlePaymentRequest} variant='outline-secondary'>Checkout</Button>
                        </div>

                    </Col>
                </Row>
            }
        </div>
    );
};

export default Payment;