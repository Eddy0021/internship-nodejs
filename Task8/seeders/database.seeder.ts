import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserEntity } from '../entities/user.entity'
import { ProductEntity } from '../entities/product.entity'

const { v4: uuidv4 } = require('uuid');

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    em.create(UserEntity, {
        id: uuidv4(),
        email: "test@test.com",
        password: "mypassword",
        role: 'admin'
    });

    em.create(ProductEntity, {
        id: uuidv4(),
        title: "book",
        description: "fancy book",
        price: 200,
    });

    em.create(ProductEntity, {
        id: uuidv4(),
        title: "pen",
        description: "fancy pen",
        price: 125,
    });
  }
}