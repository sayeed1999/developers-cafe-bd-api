"use strict";
const createError = require('http-errors');
const Product = require('../models/Product.model');
async function getAll(req, res, next) {
    try {
        const data = await Product.find();
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
async function getById(req, res, next) {
    try {
        const data = await Product.findById(req.params.id);
        if (data === null) {
            throw createError(404, 'product not found!');
        }
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
async function insertOne(req, res, next) {
    try {
        const data = await Product.insertMany([req.body]);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
async function findByIdAndUpdate(req, res, next) {
    try {
        const data = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
async function giveProductRating(req, res, next) {
    const { userid } = req.user;
    try {
        const productId = req.params.id;
        const { star } = req.body;
        // const response = await Product.updateOne({
        //   _id: productId,
        //   ratings: {
        //     userid,
        //   },
        // }, {
        //   $set: {
        //     'ratings.star': star,
        //   },
        // });
        // console.log(response);
        const product = await Product.findById(productId);
        const index = product.ratings.findIndex((x) => x.userid === userid);
        if (index === -1) {
            product.ratings.push({
                userid,
                star,
            });
        }
        else {
            product.ratings[index].star = star;
        }
        const updated = await product.save();
        // console.log(updated); // is this approach good?
        res.status(200).json({
            data: updated,
        });
    }
    catch (err) {
        next(err);
    }
}
module.exports = {
    getAll,
    getById,
    insertOne,
    findByIdAndUpdate,
    giveProductRating,
};
module.exports = {};
//# sourceMappingURL=cafe.controller.js.map