import mongoose from 'mongoose';
import { messageSchema } from './message.model';

const chatroomSchema = new mongoose.Schema<any>(
  {
    name: {
        type: String,
        required: false,
        trim: true,
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
    messages: {
        type: [messageSchema],
        default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

export default Chatroom;
