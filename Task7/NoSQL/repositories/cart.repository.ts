import { CartModel } from '../models/cart.model';
import { ProductEntity } from '../entities/product.entity';
import { CartItemEntity, CartEntity } from '../entities/cart.entity';
import productRepository from './product.repository';

const { v4: uuidv4 } = require('uuid');

// Get or create a user's cart
export const getOrCreateUserCart = async (userId: string): Promise<CartEntity> => {
  // Find user's cart in the database
  let cart = await CartModel.findOne({ user: userId });

  // If cart doesn't exist, create a new one
  if (!cart) {
    cart = await CartModel.create({
      user: userId,
      items: [],
    });
  }

  return cart;
};

// Update cart item
export const updateCartItem = async (userId: string, productId: string, count: number): Promise<CartEntity> => {
  let cart = await getOrCreateUserCart(userId);

  const cartItemIndex = cart.items.findIndex((item: CartItemEntity) => item.product.id === productId);

  if (cartItemIndex !== -1) {
    cart.items[cartItemIndex].count = count;
    await CartModel.updateOne(
      { user: userId, 'items.product._id': productId },
      { $set: { 'items.$.count': count } }
    );
  } else {
    const product = await productRepository.getProductById(productId);
    if (product) {
      cart.items.push({ product: product, count });
      await CartModel.updateOne({ user: userId },  {$set: { items: cart.items } } );
    } else {
      throw new Error('Product not found');
    }
  }

  return cart;
};

// Empty user's cart
export const emptyCart = async (userId: string): Promise<void> => {
  // Find user's cart and remove all items
  await CartModel.updateOne({ user: userId }, { $set: { items: [] } });
};

export default {
  getOrCreateUserCart,
  updateCartItem,
  emptyCart
  // Add other repository functions here
};
