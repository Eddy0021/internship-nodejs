import { Request, Response } from 'express';
import cartService from '../services/cart.service';
import { sendApiResponse } from '../helpers/response'

import Joi from "joi";

// Define a Joi schema for validating the request body
const updateCartSchema = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().integer().min(1).required()
});

export const getUserCartHandler = async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  const cart = await cartService.getUserCart(userId);

  sendApiResponse(res, 200, { cart }, null)
};

export const updateCartHandler = async (req: Request, res: Response) => {
  const { error } = updateCartSchema.validate(req.body);
  if (error) {
      return sendApiResponse(res, 400, null, error.details[0].message);
  }

  const userId = req.headers['x-user-id'] as string;
  const { productId, count } = req.body;

  const updatedCart = await cartService.updateCart(userId, productId, count);

  const cartTotal = updatedCart.items.reduce((total, item) => total + (item.product.price * item.count), 0)

  sendApiResponse(res, 200, { cart: updatedCart, total: cartTotal }, null)
};

export const emptyCartHandler = async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;

  await cartService.emptyCart(userId);

  sendApiResponse(res, 200, { success: true }, null)
};

export const checkoutCartHandler = async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;

  // Call the service function to checkout the user's cart
  const order = await cartService.checkoutCart(userId);

  sendApiResponse(res, 200, { order }, null)
};

export default {
  getUserCartHandler,
  updateCartHandler,
  emptyCartHandler,
  checkoutCartHandler
};
