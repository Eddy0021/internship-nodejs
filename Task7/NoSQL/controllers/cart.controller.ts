import { Request, Response } from 'express';
import cartService from '../services/cart.service';

import { errorHandler } from "../helpers/errorResponse"
import Joi from "joi";

// Define a Joi schema for validating the request body
const updateCartSchema = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().integer().min(1).required()
});

export const getUserCartHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    const cart = await cartService.getUserCart(userId);
    res.status(200).json({ data: cart });
  } catch (error) {
    errorHandler(res, "Error getting user cart:", error);
  }
};

export const updateCartHandler = async (req: Request, res: Response) => {
  try {
    const { error } = updateCartSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const userId = req.headers['x-user-id'] as string;
    const { productId, count } = req.body;

    const updatedCart = await cartService.updateCart(userId, productId, count);

    const cartTotal = updatedCart.items.reduce((total, item) => total + (item.product.price * item.count), 0)

    res.status(200).json({ cart: updatedCart, total: cartTotal });
  } catch (error) {
    errorHandler(res, "Error updating cart:", error);
  }
};

export const emptyCartHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    await cartService.emptyCart(userId);
    res.status(200).json({ success: true });
  } catch (error) {
    errorHandler(res, "Error emptying cart:", error);
  }
};

export const checkoutCartHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    const order = await cartService.checkoutCart(userId);
    res.status(200).json({ data: order });
  } catch (error) {
    errorHandler(res, "Error checking out cart:", error);
  }
};

export default {
  getUserCartHandler,
  updateCartHandler,
  emptyCartHandler,
  checkoutCartHandler
};
