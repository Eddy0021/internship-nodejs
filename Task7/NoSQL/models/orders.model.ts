import mongoose, { Schema } from "mongoose";
import { CartItemSchema } from "./cart.model";
import { OrderEntity } from "../entities/order.entity";

const OrderSchema: Schema = new Schema({
    userId: { type: String, required: true },
    cartId: { type: String, required: true },
    items: { type: [CartItemSchema], required: true },
    payment: {
        type: { type: String, required: true },
        address: { type: String, required: true },
        creditCard: { type: String, required: true }
    },
    delivery: {
        type: { type: String },
        address: { type: String },
    },
    comments: { type: String, required: false, default: "" },
    status: { type: String, required: true },
    total: { type: Number, required: true }
});

export default mongoose.model<OrderEntity>("Order", OrderSchema);