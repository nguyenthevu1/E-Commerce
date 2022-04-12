import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
} from '../constants/orderConstant';

import axios from 'axios';

const link = 'http://localhost:5000/api/v1';

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(link + '/order/new', order, config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST });
        const { data } = await axios.get(link + '/orders/me');
        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDER_REQUEST });
        const { data } = await axios.get(link + '/admin/orders');
        dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.put(
            link + `/admin/orders/${id}`,
            order,
            config,
        );
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(link + `/admin/orders/${id}`);
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST });
        const { data } = await axios.get(link + `/order/${id}`);
        dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
