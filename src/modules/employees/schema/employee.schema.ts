import { Schema } from "mongoose";

export const EmployeeSchema = new Schema({
    name: String,
    lastname: String,
    telephone:String,
    dpi: String,
    image: String,
    address: String,
    input_date: Date,
    output_date: Date,
    creationDate: { type: Date, default: Date.now }
})