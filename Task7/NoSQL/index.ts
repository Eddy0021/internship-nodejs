// index.js
import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import errorMiddleware from './middleware/error.middleware';
import dotenv from "dotenv";
import { connect } from './config/db';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Connect to MongoDB and start server
connect()
  .then(database => {
    app.locals.db = database;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Server failed to start:", error);
  });
