const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const product = require('./routers/product');
const user = require('./routers/user');
const order = require('./routers/order');
const payment = require('./routers/payment');

const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cors());
app.use(cookieParser());
app.use(fileUpload());

//routes
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
