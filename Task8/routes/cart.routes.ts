//const express = require('express');
import express from 'express';
import cartController from '../controllers/cart.controller';
import errorMiddleware from '../middleware/error.middleware';
import adminMiddleware from '../middleware/admin.middleware';

const router = express.Router();

// Define routes
router.get('/', cartController.getUserCartHandler);
router.put('/', cartController.updateCartHandler);
router.delete('/', adminMiddleware, cartController.emptyCartHandler);
router.post('/checkout', cartController.checkoutCartHandler);

// Attach error middleware
router.use(errorMiddleware);

export default router;
