import { Entity, PrimaryKey, Property, OneToMany, Collection, ManyToOne, ManyToMany } from '@mikro-orm/core';
import { CartItemEntity } from './cart.entity';

type ORDER_STATUS = 'created' | 'completed';

@Entity()
export class OrderEntity {
  @PrimaryKey()
  id: string;

  @Property()
  userId: string;

  @Property()
  cartId: string;

  @ManyToMany(() => CartItemEntity)
  items? = new Collection<CartItemEntity>(this);

  @Property()
  paymentType: string;

  @Property()
  address?: any;

  @Property()
  creditCard?: any;

  @Property()
  deliveryType: string;

  @Property()
  deliveryAddress: any;

  @Property()
  comments: string;

  @Property()
  status: ORDER_STATUS;

  @Property()
  total: number;

  constructor(id: string, userId: string, cartId: string, paymentType: string, address: any, creditCard: any, deliveryType: string, deliveryAddress: any, comments: string, status: ORDER_STATUS, total: number) {
    this.id = id;
    this.userId = userId;
    this.cartId = cartId;
    this.paymentType = paymentType;
    this.address = address;
    this.creditCard = creditCard;
    this.deliveryType = deliveryType;
    this.deliveryAddress = deliveryAddress;
    this.comments = comments;
    this.status = status;
    this.total = total;
  }
}
