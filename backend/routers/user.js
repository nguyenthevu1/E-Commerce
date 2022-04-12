const router = require('express').Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateRole,
    deleteUser,
} = require('../controllers/UserController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/password/forgot', forgotPassword);

router.put('/password/reset/:token', resetPassword);

router.get('/logout', logoutUser);

router.put('/me/update', isAuthenticatedUser, updateProfile);

router.get('/me', isAuthenticatedUser, getUserDetails);

router.put('/password/update', isAuthenticatedUser, updatePassword);

router.get(
    '/admin/users',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    getAllUser,
);

router.get(
    '/admin/user/:id',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    getSingleUser,
);

router.put(
    '/admin/user/:id',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    updateRole,
);

router.delete(
    '/admin/user/:id',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    deleteUser,
);

module.exports = router;
