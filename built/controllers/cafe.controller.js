"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveProductRating = exports.findByIdAndUpdate = exports.insertOne = exports.getById = exports.getAll = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
async function getAll(req, res, next) {
    try {
        const data = await Product_model_1.default.find();
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
exports.getAll = getAll;
async function getById(req, res, next) {
    try {
        const data = await Product_model_1.default.findById(req.params.id);
        if (data === null) {
            throw (0, http_errors_1.default)(404, 'product not found!');
        }
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
exports.getById = getById;
async function insertOne(req, res, next) {
    try {
        const data = await Product_model_1.default.insertMany([req.body]);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
exports.insertOne = insertOne;
async function findByIdAndUpdate(req, res, next) {
    try {
        const data = await Product_model_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
exports.findByIdAndUpdate = findByIdAndUpdate;
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
        const product = await Product_model_1.default.findById(productId);
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
exports.giveProductRating = giveProductRating;
//# sourceMappingURL=cafe.controller.js.map