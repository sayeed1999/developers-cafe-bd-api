import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema<any>(
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

const Message = mongoose.model('message', messageSchema);

export default Message;

export {
  messageSchema,
};
