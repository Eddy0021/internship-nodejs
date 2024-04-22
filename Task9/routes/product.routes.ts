import express from 'express';
import productController from '../controllers/product.controller';
import errorMiddleware from '../middleware/error.middleware';

const router = express.Router();

// Define routes
router.get('/', productController.getAllProductsHandler);
router.get('/:id', productController.getProductByIdHandler);

// Attach error middleware
router.use(errorMiddleware);

export default router;
