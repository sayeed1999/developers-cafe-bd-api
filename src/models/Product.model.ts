import { Schema } from "mongoose";

const mongoose = require('mongoose');

const productSchema: Schema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
        type: String,
        required: false,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0.0,
    },
    stocked: {
        type: Boolean,
        required: false,
        default: true,
    },
    ratings: {
      type: Array,
    },
  },
  {
    timeStamps: true,
  },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

export = {};
