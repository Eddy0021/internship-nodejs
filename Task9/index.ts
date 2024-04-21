import express, { Express } from "express";
import { Server } from "http";
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import errorMiddleware from './middleware/error.middleware';
import { authMiddleware } from "./middleware/auth.middleware";
import { requestLogger } from "./middleware/logger.middleware";

import config  from './orm'

import checkHealth from "./controllers/health.controller";
import cartRoute from './routes/cart.routes'
import productRoute from './routes/product.routes'
import userRoute from './routes/user.routes'

import { CartEntity } from "./entities/cart.entity";
import { ProductEntity } from "./entities/product.entity";
import { OrderEntity } from "./entities/order.entity";
import { UserEntity } from "./entities/user.entity";

import dotenv from "dotenv";

dotenv.config();

// Define custom type alias combining Express and http.Server types
type ExpressServer = Express & Server;

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    cartRepository: EntityRepository<CartEntity>,
    productRepository: EntityRepository<ProductEntity>,
    orderRepository: EntityRepository<OrderEntity>,
    userRepository: EntityRepository<UserEntity>,
};

declare global {
    namespace Express {
        interface Request {
            user: UserEntity
        }
    }
}

const app: ExpressServer = express() as ExpressServer;
const PORT = process.env.PORT || 8000;

let server: Server;

let connections: any[] = [];

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

    // Authentication middleware
    app.use((req, res, next) => {
        if (req.path.startsWith('/api/products') || req.path.startsWith('/api/carts')) {
        authMiddleware(req, res, next);
        } else {
        next();
        }
    });
    
    // Routes
    app.use("/health", checkHealth);
    app.use(requestLogger);
    app.use('/api/products', productRoute);
    app.use('/api/carts', cartRoute);
    app.use('/api/user', userRoute);
  
  
    // Error handling middleware
    app.use(errorMiddleware);

    // Start the server after initializing MikroORM
    server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

main().catch(err => {
    console.error('Error initializing MikroORM:', err);
    process.exit(1); // Exit the process if an error occurs during initialization
});

app.on('connection', (connection) => {
    // register connections
    connections.push(connection);
    
    // remove/filter closed connections
    connection.on('close', () => {
      connections = connections.filter((currentConnection) => currentConnection !== connection);
    });
  });

function shutdown() {
    console.log('Received kill signal, shutting down gracefully');
    
    server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
    });
  
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 20000);
  
    // end current connections
    connections.forEach((connection) => connection.end());
    
    // then destroy connections
    setTimeout(() => {
      connections.forEach((connection) => connection.destroy());
    }, 10000);
  }
  
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
