const router = require('express').Router();

const {
    createOrder,
    getSingleOrder,
    getMyOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.post('/order/new', isAuthenticatedUser, createOrder);

router.get('/orders/me', isAuthenticatedUser, getMyOrders);

router.get('/order/:id', isAuthenticatedUser, getSingleOrder);

router.get(
    '/admin/orders',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    getAllOrders,
);

router.put(
    '/admin/order/:id',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    updateOrder,
);

router.delete(
    '/admin/order/:id',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    deleteOrder,
);

module.exports = router;
