import React, { Fragment, useState } from 'react';
import './header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';

const UserOptions = ({ user }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const history = useHistory();
    const alert = useAlert();
    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAltIcon />, name: 'Orders', func: orders },
        { icon: <PersonIcon />, name: 'Profile', func: account },
        {
            icon: (
                <ShoppingCartIcon
                    style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }}
                />
            ),
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
    ];

    if (user.role === 'admin') {
        options.unshift({
            icon: <DashboardIcon />,
            name: 'Dashboard',
            func: dashboard,
        });
    }

    function dashboard() {
        history.push('/admin/dashboard');
    }
    function orders() {
        history.push('/orders');
    }
    function account() {
        history.push('/account');
    }
    function cart() {
        history.push('/cart');
    }
    function logoutUser() {
        dispatch(logout());
        alert.success('Logout Successfully');
        history.push('/');
    }

    return (
        <Fragment>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                style={{ zIndex: '11' }}
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                        alt="profile"
                    />
                }
            >
                {options.map((option) => (
                    <SpeedDialAction
                        key={option.name}
                        icon={option.icon}
                        tooltipTitle={option.name}
                        onClick={option.func}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;
