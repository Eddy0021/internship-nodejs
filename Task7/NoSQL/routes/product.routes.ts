import express from 'express';
import productController from '../controllers/product.controller';
import authMiddleware from '../middleware/auth.middleware';
import errorMiddleware from '../middleware/error.middleware';

const router = express.Router();

// Attach authentication middleware to all routes in this router
router.use(authMiddleware);

// Define routes
router.get('/', productController.getAllProductsHandler);
router.get('/:id', productController.getProductByIdHandler);

// Attach error middleware
router.use(errorMiddleware);

export default router;
