import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { OrdersGrid } from './OrdersGrid';
import './OrdersPage.css';
import { OrderDetailsGrid } from './OrderDetailsGrid';

export function OrdersPage( { cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrdersData = async () => {
            const res = await axios.get('/api/orders?expand=products')
            setOrders(res.data);
        };

        getOrdersData();
    }, []);

    return (
        <>
            <Header cart={cart} />

            <title>Orders</title>
            
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} />
            </div>
        </>
    );
}