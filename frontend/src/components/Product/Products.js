import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';

import { getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import Pagination from 'react-js-pagination';
import './products.css';
import { clearErrors } from './../../actions/productAction';
import MetaData from './../layout/MetaData';

const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones',
];

const Products = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const {
        loading,
        error,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    const count = filteredProductsCount;
    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, rating));
    }, [dispatch, keyword, currentPage, price, error, category, rating, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS -- ECOMMERCE" />
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>
                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">
                                Ratings Above
                            </Typography>
                            <Slider
                                value={rating}
                                onChange={(e, newRating) => {
                                    setRating(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>
                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                lastPageText="Last"
                                firstPageText="1st"
                                prevPageText="Prev"
                                nextPageText="Next"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
