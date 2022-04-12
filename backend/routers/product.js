const router = require('express').Router();
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createReview,
    getProductReview,
    deleteProductReview,
    getAdminProducts,
} = require('../controllers/ProductController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.get('/products', getAllProducts);
router.get(
    '/admin/products',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    getAdminProducts,
);

router.post(
    '/admin/product/new',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    createProduct,
);

router.put(
    '/admin/product/:id',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    updateProduct,
);
router.delete(
    '/admin/product/:id',
    isAuthenticatedUser,
    authorizeRoles('admin'),
    deleteProduct,
);

router.get('/product/:id', getProductDetails);

router.put('/review', isAuthenticatedUser, createReview);

router.delete('/reviews', isAuthenticatedUser, deleteProductReview);

router.get('/reviews', isAuthenticatedUser, getProductReview);

module.exports = router;
