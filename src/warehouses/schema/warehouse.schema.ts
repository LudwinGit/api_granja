import { Schema } from "mongoose";

export const WarehouseSchema = new Schema({
    warehouseCategory: [{type:Schema.Types.ObjectId,ref:'WarehouseCategory' }],
    creationDate: { type: Date, default: Date.now }
})