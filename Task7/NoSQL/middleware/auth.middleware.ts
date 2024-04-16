import { Request, Response, NextFunction } from 'express';
import userRepository from "../repositories/user.repository";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.headers['x-user-id'] ? req.headers['x-user-id'].toString() : "";

  if (!userId) {
    res.status(401).json({error: 'Unauthorized. User ID is missing.'})
    return;
  }

  const user = await userRepository.getUserById(userId);

  if(!user){
    res.status(404).json({error: 'User doesn`t exists.'})
    return;
  }

  if (user.role !== 'admin') {
    res.status(403).json({error: 'Forbidden. User does not have access.'})
  }

  next();
};

export default authMiddleware;
