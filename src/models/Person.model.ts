import { Schema } from "mongoose";

const mongoose = require('mongoose');

const personSchema: Schema = mongoose.Schema(
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
    timeStamps: true,
  },
);

const Person = mongoose.model('Person', personSchema);

module.exports = Person;

export = {};
