import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        // required: true,
        // unique: true,
    },
    slug: {
        type: String,
        lowercase: true,
    }
});

export default model('Category', categorySchema);
