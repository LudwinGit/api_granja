import { Document } from "mongoose";
import { WarehouseCategory } from "src/warehousecategories/interfaces/warehousecategories.interface";

export interface Warehouse extends Document {
    readonly warehouseCategoryID: WarehouseCategory;
    readonly creationDate: Date;
}