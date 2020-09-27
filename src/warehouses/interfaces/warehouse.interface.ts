import { Document } from "mongoose";

export interface Warehouse extends Document {
    readonly warehouseCategory: String;
    readonly name: String;
    readonly creationDate: Date;
}