import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CgMouse } from 'react-icons/all';
import MetaData from '../layout/MetaData.js';
import { getProduct, clearErrors } from './../../actions/productAction';
import ProductCard from './ProductCard.js';
import './home.css';
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="ECOMMERCE" />

                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Feature Products</h2>

                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
