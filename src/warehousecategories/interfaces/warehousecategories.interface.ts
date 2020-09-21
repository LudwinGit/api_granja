import { Document } from "mongoose";

export interface WarehouseCategory extends Document {
    readonly title: String;
    readonly logo: String;
    readonly creationDate: Date;
}