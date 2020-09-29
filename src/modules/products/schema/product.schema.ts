import { Schema } from "mongoose";

export const ProductSchema = new Schema({
    sku: String,
    description: String,
    price_cost:Number,
    image: String,
    status: String,
    units_package:Number,
    min_stock: Number,
    creationDate: { type: Date, default: Date.now }
})