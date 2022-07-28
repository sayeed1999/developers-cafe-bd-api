"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
//# sourceMappingURL=Product.model.js.map