import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ProductEntity {
  @PrimaryKey()
  id: string;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  price: number;

  constructor(id: string, title: string, description: string, price: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
