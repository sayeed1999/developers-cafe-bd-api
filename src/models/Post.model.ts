import { Schema } from "mongoose";

const mongoose = require('mongoose');

const { Comment, commentSchema } = require('./Comment.model');

const postSchema: Schema = mongoose.Schema(
  {
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
        type: [commentSchema],
        default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timeStamps: true,
  },
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

export = {};

