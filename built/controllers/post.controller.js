"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdAndUpdate = exports.insertOne = exports.getById = exports.getAll = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Post_model_1 = __importDefault(require("../models/Post.model"));
async function getAll(req, res, next) {
    try {
        const { size, page } = req.query; // query parameters
        const data = await Post_model_1.default
            .find()
            .sort({ createdAt: -1 })
            .limit(size).skip(size * (page - 1));
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
exports.getAll = getAll;
async function getById(req, res, next) {
    try {
        const data = await Post_model_1.default.findById(req.params.id);
        if (data === null) {
            throw (0, http_errors_1.default)(404, 'post not found!');
        }
        res.status(200).json({
            data,
        });
    }
    catch (err) {
        next(err);
    }
}
exports.getById = getById;
async function insertOne(req, res, next) {
    try {
        const data = await Post_model_1.default.insertMany([req.body]);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
exports.insertOne = insertOne;
async function findByIdAndUpdate(req, res, next) {
    try {
        const data = await Post_model_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
exports.findByIdAndUpdate = findByIdAndUpdate;
//# sourceMappingURL=post.controller.js.map