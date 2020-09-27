import { Document } from "mongoose";

export interface WarehouseCategory extends Document {
    readonly name: String;
    readonly logo: String;
    readonly creationDate: Date;
}