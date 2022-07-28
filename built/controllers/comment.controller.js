"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertOne = void 0;
const Post_model_1 = __importDefault(require("../models/Post.model"));
async function insertOne(req, res, next) {
    const fullUrl = req.originalUrl.split('/');
    const postId = fullUrl[fullUrl.length - 2];
    const comment = req.body;
    try {
        await Post_model_1.default.updateOne({
            _id: postId,
        }, {
            $push: {
                comments: comment,
            },
        });
        const modifiedPost = await Post_model_1.default.findById(postId);
        res.status(201).json({ data: modifiedPost });
    }
    catch (err) {
        next(err);
    }
}
exports.insertOne = insertOne;
//# sourceMappingURL=comment.controller.js.map