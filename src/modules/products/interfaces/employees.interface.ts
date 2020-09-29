import { Document } from "mongoose";

export interface Product extends Document {
    readonly sku: String;
    readonly description: String;
    readonly price_cost: Number;
    readonly image: String;
    readonly status: String;
    readonly units_package: Number;
    readonly min_stock: Number;
}