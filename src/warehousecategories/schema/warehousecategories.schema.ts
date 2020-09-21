import { Schema } from "mongoose";

export const WarehouseCategorySchema = new Schema({
    title: { type: String, unique: true, required: true },
    logo: String,
    creationDate: { type: Date, default: Date.now }
})