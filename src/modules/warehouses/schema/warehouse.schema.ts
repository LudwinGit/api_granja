import { Schema } from "mongoose";

export const WarehouseSchema = new Schema({
    warehouseCategory: {
        type: Schema.Types.ObjectId,
        ref: 'WarehouseCategory'
    },
    name: {
        type:String,
        unique: true
    },
    creationDate: { type: Date, default: Date.now }
})