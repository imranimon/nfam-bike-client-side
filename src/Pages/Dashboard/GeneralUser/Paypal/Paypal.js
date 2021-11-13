import React, { useEffect, useRef } from 'react';
import useSwal from '../../../../hooks/useSwal';

const Paypal = ({ setCheckout, setPaymentSuccess }) => {
    const paypal = useRef()
    const { swalError, swalReturnSuccess } = useSwal()
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                        description: "NFam Electric Bike",
                        amount: {
                            currency_code: "EUR",
                            value: 1.00,
                        }
                    }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                swalReturnSuccess('Payment Successful', 'Ok')
                    .then(() => {
                        setCheckout(false)
                    })


            },
            onError: (err) => {
                swalError('Payment Error')
            }
        }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
};

export default Paypal;