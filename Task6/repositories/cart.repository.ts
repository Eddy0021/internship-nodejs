import { CartEntity, CartItemEntity } from '../entities/cart.entity';
import productRepository from './product.repository';

const { v4: uuidv4 } = require('uuid');

const userCarts: { [userId: string]: CartEntity } = {};

  
// Get or Create Cart
export const getOrCreateUserCart = async (userId: string): Promise<CartEntity> => {
  // Check if the user already has a cart
  if (userId in userCarts) {
    return userCarts[userId];
  }

  // If the user does not have a cart, create a new one
  const newCart: CartEntity = {
    id: uuidv4(), // Generate a unique ID for the cart
    userId,
    isDeleted: false,
    items: [],
  };

  // Save the new cart in the userCarts object
  userCarts[userId] = newCart;

  return newCart;
};

// Update Cart
export const updateCartItem = async (userId: string, productId: string, count: number): Promise<CartEntity> => {
  // Retrieve user's cart from storage
  const cart = userCarts[userId];

  // Find the cart item corresponding to the provided product ID
  const cartItemIndex = cart.items.findIndex(item => item.product.id === productId);

  if (cartItemIndex !== -1) {
    // If the product already exists in the cart, update its count
    cart.items[cartItemIndex].count = count;
  } else {
    // If the product does not exist in the cart, add it as a new item
    const product = await productRepository.getProductById(productId); // Retrieve product details from storage
    if (product) {
      const newCartItem: CartItemEntity = {
        product,
        count,
      };
      cart.items.push(newCartItem);
    } else {
      throw new Error('Product not found'); // Handle product not found error
    }
  }

  return cart;
};

// Delete cart

export const emptyCart = async (userId: string): Promise<void> => {
  userCarts[userId].items = [];
}

export default {
  getOrCreateUserCart,
  updateCartItem,
  emptyCart
  // Add other repository functions here
};
  