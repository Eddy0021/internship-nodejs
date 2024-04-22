// user.router.ts

import express from 'express';
import UserController from '../controllers/user.controller';
import errorMiddleware from '../middleware/error.middleware';

const router = express.Router();

// Define routes
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

// Attach error middleware
router.use(errorMiddleware);

export default router;
