import { OrderEntity } from '../entities/order.entity';
import { UserEntity } from '../entities/user.entity';
import { CartEntity } from '../entities/cart.entity';

const { v4: uuidv4 } = require('uuid');

import {DI} from '../index'

const createOrder = async (user: UserEntity, cart: CartEntity): Promise<OrderEntity> => {
    try {   
        const newOrder = new OrderEntity(
            uuidv4(),
            user.id,
            cart.id,    
            'paypal',  // paymentType
            'Novi Sad', // paymentAddress
            '0000-0000-0000', // paymentCard
            'post', // deliveryType
            'Novi Sad', // deliveryAddress
            '', // comments
            'created', // status
            cart.items.getItems().reduce((total, item) => total + (item.product.price * item.count), 0) // total
        );

        cart.isDeleted = true;

        newOrder.items = cart.items;

        await DI.em.persistAndFlush(newOrder);

        return newOrder;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export default {
    createOrder,
};
