import { Document } from "mongoose";

export interface Employee extends Document {
    readonly name: String;
    readonly lastname: String;
    readonly telephone: String;
    readonly dpi: String;
    readonly image: String;
    readonly address: String;
    readonly input_date: Date;
    readonly output_date: Date;
    readonly creationDate: Date;
}