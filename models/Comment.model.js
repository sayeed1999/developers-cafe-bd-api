const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
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
  },
  {
    timeStamps: true,
  },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  Comment,
  commentSchema,
};
