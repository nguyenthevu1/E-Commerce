import React, { Fragment, useEffect } from 'react';
import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import MetaData from './../layout/MetaData';
import { clearErrors } from '../../actions/productAction';
import { deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const OrderList = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.order,
    );

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success('Order Deleted Successfully');
            history.push('/admin/orders');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, alert, deleteError, isDeleted, history]);

    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, 'status') === 'Delivered'
                    ? 'greenColor'
                    : 'redColor';
            },
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'Number',
            minWidth: 150,
            flex: 0.4,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'Number',
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            type: 'number',
            sortTable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link
                            to={`/admin/order/${params.getValue(
                                params.id,
                                'id',
                            )}`}
                        >
                            <EditIcon />
                        </Link>
                        <Button
                            onClick={() =>
                                deleteOrderHandler(
                                    params.getValue(params.id, 'id'),
                                )
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemQty: item.orderItems.length,
                price: item.totalPrice,
                status: item.orderStatus,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;
