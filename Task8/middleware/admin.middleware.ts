// admin.middleware.ts
import { Request, Response, NextFunction } from 'express';
import userRepository from "../repositories/user.repository";

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.headers['x-user-id'] ? req.headers['x-user-id'].toString() : "";

    const user = await userRepository.getUserById(userId);

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden. Admin access required.' });
  }

  next();
};

export default adminMiddleware;
