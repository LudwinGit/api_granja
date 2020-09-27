import { Schema } from "mongoose";

export const WarehouseCategorySchema = new Schema({
    name: { 
        type: String, 
        unique: true 
    },
    logo: String,
    creationDate: { type: Date, default: Date.now }
})