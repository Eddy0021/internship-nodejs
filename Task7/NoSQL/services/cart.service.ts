// Import cart repository
import { error } from 'console';
import { CartEntity, CartItemEntity } from '../entities/cart.entity';
import { OrderEntity } from '../entities/order.entity';
import { UserEntity } from '../entities/user.entity';

import cartRepository from '../repositories/cart.repository';
import orderRepository from '../repositories/order.repository';
import userRepository from '../repositories/user.repository';

export const getUserCart = async (userId: string): Promise<CartEntity> => {
  const cart = await cartRepository.getOrCreateUserCart(userId);
  return cart;
};

export const updateCart = async (userId: string, productId: string, count: number): Promise<CartEntity> => {
  const updatedCart = await cartRepository.updateCartItem(userId, productId, count);
  return updatedCart;
};

export const emptyCart = async (userId: string): Promise<void> => {
  await cartRepository.emptyCart(userId);
};

export const checkoutCart = async (
  userId: string,
): Promise<OrderEntity | null> => {

  const user: UserEntity | null = await userRepository.getUserById(userId);
  if (!user) {
    return null;
  }
  const cart: CartEntity = await cartRepository.getOrCreateUserCart(userId);
  
  const order = await orderRepository.createOrder(user, cart);
  emptyCart(userId);
  return order;
};

export default {
  getUserCart,
  updateCart,
  emptyCart,
  checkoutCart
};
