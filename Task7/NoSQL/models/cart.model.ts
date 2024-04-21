// cart.model.ts
import mongoose, { Schema, Model } from "mongoose";
import { ProductSchema } from "./product.model";
import { CartEntity, CartItemEntity } from "../entities/cart.entity";

// Define schema for cart items
export const CartItemSchema: Schema = new Schema({
    product: { type: ProductSchema, required: true },
    count: { type: Number, required: true },
});

// Define model for cart items
export const CartItemModel: Model<CartItemEntity> = mongoose.model<CartItemEntity>("CartItem", CartItemSchema);

// Define schema for carts
const CartSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    items: { type: [CartItemSchema], required: true }
});

// Define model for carts
export const CartModel: Model<CartEntity> = mongoose.model<CartEntity>("Cart", CartSchema);
