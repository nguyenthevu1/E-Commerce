import React, { Fragment } from 'react';
import './cart.css';
import CartItemCard from './CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {
    addItemsToCart,
    removeItemsFromCart,
} from './../../actions/cartAction';

import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const Cart = ({ history }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity, stock) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const removeItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkOutHandler = (id) => {
        history.push('/login?redirect=shipping');
    };

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        {cartItems &&
                            cartItems.map((item) => (
                                <div
                                    key={item.product}
                                    className="cartContainer"
                                >
                                    <CartItemCard
                                        item={item}
                                        deleteCarItems={removeItems}
                                    ></CartItemCard>
                                    <div className="cartInput">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.product,
                                                    item.quantity,
                                                    item.stock,
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            readOnly
                                        />
                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.product,
                                                    item.quantity,
                                                    item.stock,
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cartSubtotal">{`$${
                                        item.price * item.quantity
                                    }`}</p>
                                </div>
                            ))}
                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`$${cartItems.reduce(
                                    (acc, item) =>
                                        acc + item.quantity * item.price,
                                    0,
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkOutHandler}>
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;