import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema<any>(
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
    timestamps: true,
  },
);

const Comment = mongoose.model('Comment', commentSchema);

export {
  Comment,
  commentSchema,
};
