import { Request, Response, NextFunction } from 'express';
import userRepository from "../repositories/user.repository";

import { sendApiResponse } from '../helpers/response'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.headers['x-user-id'] ? req.headers['x-user-id'].toString() : "";

  if (!userId) {
    return sendApiResponse(res, 401, null, 'Unauthorized. User ID is missing.');
  }

  const user = await userRepository.getUserById(userId);

  if(!user){
    return sendApiResponse(res, 404, null, 'User doesn`t exists.');
  }

  if (user.role !== 'admin') {
    return sendApiResponse(res, 403, null, 'Forbidden. User does not have access.');
  }

  next();
};

export default authMiddleware;
