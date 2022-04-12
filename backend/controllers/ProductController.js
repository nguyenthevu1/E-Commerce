const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifeatures');
const cloundinary = require('cloudinary');
//Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.req.body.images;
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloundinary.v2.uploader.upload(images[i], {
            folder: 'products',
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLink;
    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

//Get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const apiCount = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let ProductsCount = await apiCount.query;
    let filteredProductsCount = ProductsCount.length;

    let products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
    });
});

//get All Product (admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

//Get product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    res.status(200).json({ success: true, product });
});

//Update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    let images = [];

    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.req.body.images;
    }
    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloundinary.v2.uploader.destroy(product.images[i].public_id);
        }
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloundinary.v2.uploader.upload(images[i], {
            folder: 'products',
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLink;
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({ success: true, product });
});

//Delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloundinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product Delete Successfully',
    });
});

//Create New Review or update the review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString(),
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get all reviews of a product
exports.getProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//Delete review
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString(),
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        { new: true, runValidators: true, useFindAndModify: false },
    );

    res.status(200).json({
        success: true,
    });
});
