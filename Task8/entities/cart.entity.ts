import { Entity, PrimaryKey, Property, OneToMany, ManyToOne, Collection, ManyToMany } from '@mikro-orm/core';
import { ProductEntity } from './product.entity';

@Entity()
export class CartEntity {
  @PrimaryKey()
  id: string;

  @Property()
  userId: string;

  @Property()
  isDeleted: boolean = false;

  @ManyToMany(() => CartItemEntity)
  items = new Collection<CartItemEntity>(this);

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
  }
}

// Define CartItemEntity within the same file
@Entity()
export class CartItemEntity {
  @PrimaryKey()
  id: string;

  @ManyToOne(() => ProductEntity)
  product!: ProductEntity;

  @Property()
  count!: number;

  constructor(id: string, product: ProductEntity, count: number) {
    this.id = id;
    this.product = product;
    this.count = count;
  }
}
