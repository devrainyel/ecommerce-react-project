import { Link } from 'react-router';
import { Header } from '../components/Header'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import './TrackingPage.css';

export function TrackingPage( {cart} ) {
    const { orderId, productId } = useParams();
    const [order,  setOrder]   = useState(null);

    useEffect(() => {
        const fetchTrackingData = async () => {
            const res = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(res.data);
        };

        fetchTrackingData();
    }, [orderId]);

    if(!order) {
        return null;
    }

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    //  const timePassedMs = totalDeliveryTimeMs * 0.;

    //This gives us the delivery progress as a percent
    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

    if(deliveryPercent > 100) {
        deliveryPercent = 100;
    }
    console.log('Delivery percent:', deliveryPercent);
    return (
        <>

            <title>Tracking</title>
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
            
            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                    View all orders
                    </Link>

                    <div className="delivery-date">
                    Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                    {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                    Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                    <div className="progress-label">
                        Preparing
                    </div>
                    <div className="progress-label current-status">
                        Shipped
                    </div>
                    <div className="progress-label">
                        Delivered
                    </div>
                    </div>

                    <div className="progress-bar-container">
                    <div className="progress-bar" style={{
                        width: `${deliveryPercent}%`
                    }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}