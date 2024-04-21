import mongoose, { Schema } from "mongoose";
import { ProductEntity } from "../entities/product.entity";

export const ProductSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

export const ProductModel = mongoose.model<ProductEntity>('Product', ProductSchema);