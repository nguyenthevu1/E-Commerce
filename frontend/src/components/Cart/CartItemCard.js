import React from 'react';
import './cartItemCard.css';
import { Link } from 'react-router-dom';

const CartItemCard = ({ item, deleteCarItems }) => {
    return (
        <div className="cartItemCard">
            <img src={item.image} alt="product" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: $${item.price}`}</span>
                <p onClick={() => deleteCarItems(item.product)}>Remove</p>
            </div>
        </div>
    );
};

export default CartItemCard;
