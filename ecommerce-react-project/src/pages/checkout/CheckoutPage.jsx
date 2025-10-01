import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';

export function CheckoutPage( { cart } ) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        axios.get('api/delivery-options?expand=estimatedDeliveryTime')
            .then((res) => {
                setDeliveryOptions(res.data);
            });

        axios.get('api/payment-summary')   
            .then((res) => {
                setPaymentSummary(res.data)
            });
    }, [])

    return (
        <>
            <title>Checkout Project</title>

           <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />
                    
                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}