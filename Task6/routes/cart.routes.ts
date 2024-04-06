//const express = require('express');
import express from 'express';
import cartController from '../controllers/cart.controller';
import authMiddleware from '../middleware/auth.middleware';
import errorMiddleware from '../middleware/error.middleware';

const router = express.Router();

// Attach authentication middleware to all routes in this router
router.use(authMiddleware);

// Define routes
router.get('/', cartController.getUserCartHandler);
router.put('/', cartController.updateCartHandler);
router.delete('/', cartController.emptyCartHandler);
router.post('/checkout', cartController.checkoutCartHandler);

// Attach error middleware
router.use(errorMiddleware);

export default router;
