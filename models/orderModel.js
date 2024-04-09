// order.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: 'Product',
    }],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        default: 'Not Processed',
        enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    }
}, { timestamps: true });

export default model('Order', orderSchema);
