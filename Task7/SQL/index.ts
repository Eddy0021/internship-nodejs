import express, { Express } from "express";
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import errorMiddleware from './middleware/error.middleware';
import config  from './orm'

import cartRoute from './routes/cart.routes'
import productRoute from './routes/product.routes'

import { CartEntity } from "./entities/cart.entity";
import { ProductEntity } from "./entities/product.entity";
import { OrderEntity } from "./entities/order.entity";
import { UserEntity } from "./entities/user.entity";

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    cartRepository: EntityRepository<CartEntity>,
    productRepository: EntityRepository<ProductEntity>,
    orderRepository: EntityRepository<OrderEntity>,
    userRepository: EntityRepository<UserEntity>,
  };

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Initialize MikroORM before defining routes and middleware
const main = async () => {
    DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

    DI.em = DI.orm.em;
    DI.cartRepository = DI.orm.em.getRepository(CartEntity);
    DI.productRepository = DI.orm.em.getRepository(ProductEntity);
    DI.orderRepository = DI.orm.em.getRepository(OrderEntity);
    DI.userRepository = DI.orm.em.getRepository(UserEntity);


    // Middleware
    app.use(express.json());
    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
    // Routes
    app.use('/api/products', productRoute);
    app.use('/api/carts', cartRoute);

    // Error handling middleware
    app.use(errorMiddleware);

    // Start the server after initializing MikroORM
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

main().catch(err => {
    console.error('Error initializing MikroORM:', err);
    process.exit(1); // Exit the process if an error occurs during initialization
});
