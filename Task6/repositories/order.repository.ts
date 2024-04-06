import { OrderEntity } from "../entities/order.entity";
import { CartEntity } from "../entities/cart.entity";
import { UserEntity } from "../entities/user.entity";

const { v4: uuidv4 } = require('uuid');

const orders: OrderEntity[] = [];

  const createOrder = async (user: UserEntity, cart: CartEntity) => {
    const newOrder: OrderEntity = {
      id: uuidv4(),
      userId: user.id,
      cartId: cart.id,
      items: [...cart.items],
      payment: {
          type: "paypal",
          address: "Novi Sad",
          creditCard: "0000-0000-0000-0000"
      },
      delivery: {
          type: "post",
          address: "Bulevar os. 15"
      },
      comments: "",
      status: "created",
      total: cart.items.reduce((total, item) => total + (item.product.price * item.count), 0)
  }
    orders.push(newOrder);
    return newOrder;
  };
  
  
  export default {
    createOrder,
  };
  