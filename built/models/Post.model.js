"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Comment_model_1 = require("./Comment.model");
const postSchema = new mongoose_1.default.Schema({
    userid: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: false,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
    comments: {
        type: [Comment_model_1.commentSchema],
        default: [],
    },
    likes: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
});
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
//# sourceMappingURL=Post.model.js.map