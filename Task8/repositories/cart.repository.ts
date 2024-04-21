import { CartEntity, CartItemEntity } from '../entities/cart.entity';
import productRepository from './product.repository';

const { v4: uuidv4 } = require('uuid');

import {DI} from '../index'
  
// Get or Create Cart
export const getOrCreateUserCart = async (userId: string): Promise<CartEntity> => {
    const cart = await DI.cartRepository.findOne({userId: userId, isDeleted: false}, { populate: ['items.product'] })
    
    if(cart){
        return cart;
    }

    const newCart = new CartEntity(uuidv4(), userId);
    
    await DI.em.persistAndFlush(newCart);

    return newCart;
};

// Update Cart
export const updateCartItem = async (userId: string, productId: string, count: number): Promise<CartEntity> => {
    const cart = await DI.cartRepository.findOneOrFail({userId: userId, isDeleted: false}, { populate: ['items.product'] })

    // Find the cart item corresponding to the provided product ID
    const cartItemIndex = cart.items.find(item => item.product.id === productId);

    if (cartItemIndex) {       
        cartItemIndex.count = count;
    } else {
        const product = await DI.productRepository.findOne({id: productId})

        if (product) {
            const newCartItem = new CartItemEntity(uuidv4(), product, count); 
            cart.items.add(newCartItem);
        } else {
        throw new Error('Product not found');
        }
    }

    await DI.em.flush();
    return cart;
};

// Delete cart

export const emptyCart = async (userId: string): Promise<void> => {
    const cart = await DI.cartRepository.findOneOrFail({ userId: userId, isDeleted: false }, { populate: ['items'] });

    // Remove each item from the cart and flush changes to the entity manager
    for (const item of cart.items.getItems()) {
        await DI.em.removeAndFlush(item);
    }

    // Clear the items collection in memory
    cart.items.removeAll();
}

export default {
  getOrCreateUserCart,
  updateCartItem,
  emptyCart
  // Add other repository functions here
};
  