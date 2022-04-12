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
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import { deleteUser, getAllUsers } from '../../actions/userAction';

const UserList = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, users } = useSelector((state) => state.allUsers);

    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.user);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
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
            alert.success(message);
            history.push('/admin/users');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAllUsers());
    }, [dispatch, error, alert, deleteError, isDeleted, history, message]);

    const columns = [
        { field: 'id', headerName: 'User ID', minWidth: 100, flex: 1 },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'name',
            headerName: 'Name',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: 'role',
            headerName: 'Role',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
            cellName: (params) => {
                return params.getValue(params.id, 'role') === 'admin'
                    ? 'greenColor'
                    : 'redColor';
            },
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
                            to={`/admin/user/${params.getValue(
                                params.id,
                                'id',
                            )}`}
                        >
                            <EditIcon />
                        </Link>
                        <Button
                            onClick={() =>
                                deleteUserHandler(
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

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>
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

export default UserList;
