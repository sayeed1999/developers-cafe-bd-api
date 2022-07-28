import { Schema, model } from "mongoose";

const productSchema: Schema = new Schema<any>(
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
    timestamps: true,
  },
);

const Product = model('Product', productSchema);

export default Product;
