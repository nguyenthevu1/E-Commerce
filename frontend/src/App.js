import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import webFont from 'webfontloader';
import './App.css';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import UserOptions from './components/layout/Header/UserOptions';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassWord from './components/User/ForgotPassWord';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import axios from 'axios';
import { loadUser } from './actions/userAction';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrder';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList.js';
import ProcessOrder from './components/admin/ProcessOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

const App = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const [stripeApiKey, setStripeApiKey] = useState('');

    async function getStripeApiKey() {
        const { data } = await axios.get(
            'http://localhost:5000/api/v1/stripeapikey',
        );
        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        webFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });
        store.dispatch(loadUser());
        getStripeApiKey();
    }, []);

    return (
        <Router>
            <Header />

            {isAuthenticated && <UserOptions user={user} />}
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />

            <Route exact path="/search" component={Search} />
            <ProtectedRoute exact path="/account" component={Profile} />
            <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
            <ProtectedRoute
                exact
                path="/password/update"
                component={UpdatePassword}
            />
            <Route exact path="/password/forgot" component={ForgotPassWord} />
            <Route
                exact
                path="/password/reset/:token"
                component={ResetPassword}
            />

            <Route exact path="/login" component={LoginSignUp} />
            <Route exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/shipping" component={Shipping} />

            {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute
                        exact
                        path="/process/payment"
                        component={Payment}
                    />
                </Elements>
            )}
            <ProtectedRoute exact path="/success" component={OrderSuccess} />
            <ProtectedRoute exact path="/orders" component={MyOrders} />
            <Switch>
                <ProtectedRoute
                    exact
                    path="/order/confirm"
                    component={ConfirmOrder}
                />
                <ProtectedRoute
                    exact
                    path="/order/:id"
                    component={OrderDetails}
                />
            </Switch>
            <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/dashboard"
                component={Dashboard}
            />
            <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/products"
                component={ProductList}
            />
            <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/product/new"
                component={NewProduct}
            />
            <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/product/:id"
                component={UpdateProduct}
            />
            <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/orders"
                component={OrderList}
            />
            <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/order/:id"
                component={ProcessOrder}
            />
            <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/users"
                component={UserList}
            />
            <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/user/:id"
                component={UpdateUser}
            />
            <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/reviews"
                component={ProductReviews}
            />
            <Footer />
        </Router>
    );
};

export default App;
