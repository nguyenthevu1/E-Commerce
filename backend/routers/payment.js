const {
    processPayment,
    sendStripeApiKey,
} = require('../controllers/PaymentController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = require('express').Router();

router.post('/payment/process', isAuthenticatedUser, processPayment);
router.get('/stripeapikey', isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
