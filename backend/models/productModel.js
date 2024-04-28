import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        stockQuantity: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export const  Product = mongoose.model("Product", productSchema)