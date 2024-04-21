// user.controller.ts
import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { errorHandler } from "../helpers/errorResponse";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    await UserService.signup(email, password, role);
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    errorHandler(res, 'Error creating user:', error);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.signin(email, password);
    res.json({ token });
  } catch (error) {
    errorHandler(res, 'Error signing in:', error);
  }
};

export default {
  signup,
  signin,
};
