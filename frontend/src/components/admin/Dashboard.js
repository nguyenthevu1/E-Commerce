import React, { useEffect } from 'react';
import Sidebar from './Sidebar.js';
import './dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction.js';
import { useAlert } from 'react-alert';
import { getAllOrders } from './../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction.js';

const Dashboard = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { error, users } = useSelector((state) => state.allUsers);

    let outStock = 0;

    products &&
        products.forEach((item) => {
            if (item.stock === 0) {
                outStock += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch, alert]);

    const lineState = {
        labels: ['Initial Amount', 'Amount Earned'],
        datasets: [
            {
                label: 'Total Amount',
                backgroundColor: ['tomato'],
                hoverBackgroundColor: ['rgb(197,72,49)'],
                data: [0, 4000],
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'inStock'],
        datasets: [
            {
                backgroundColor: ['#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['#4B5000', '##35014F'],
                data: [outStock, products.length - outStock],
            },
        ],
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount
                            <br />
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Order</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>users</p>
                            <p>{users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
