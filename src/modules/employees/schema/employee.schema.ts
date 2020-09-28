import { Schema } from "mongoose";

export const EmployeeSchema = new Schema({
    name: String,
    lastname: String,
    telephone:String,
    dpi: String,
    image: String,
    address: String,
    isSeller: {type:Boolean,default:false},
    status: String,
    warehouses: {type:[Schema.Types.ObjectId],ref:"Warehouse"},
    input_date: Date,
    output_date: Date,
    creationDate: { type: Date, default: Date.now }
})