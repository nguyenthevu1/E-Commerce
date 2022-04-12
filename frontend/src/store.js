import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    profileReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
} from './reducers/userReducer';
import {
    newProductReducer,
    productDetailsReducer,
    productReducer,
    productReviewsReducer,
    productsReducer,
    reviewReducer,
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import {
    allOrderReducer,
    myOrderReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from './reducers/orderReducer';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetail: orderDetailsReducer,
    newReview: newOrderReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrderReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : [],
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
