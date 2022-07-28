import mongoose from 'mongoose';

const personSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

const Person = mongoose.model('Person', personSchema);

export default Person;
