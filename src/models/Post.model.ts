import mongoose from 'mongoose';

import { commentSchema } from './comment.model';

const postSchema = new mongoose.Schema(
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
    timestamps: true,
  },
);

const Post = mongoose.model('Post', postSchema);

export default Post;

