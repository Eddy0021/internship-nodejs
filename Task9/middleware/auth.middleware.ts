// auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { UserEntity } from '../entities/user.entity';
import dotenv from "dotenv";

dotenv.config();

export async function authMiddleware (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("Token is required");
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
        return res.status(403).send("Invalid Token");
    } 

    try {
        const user = jwt.verify(token, process.env.TOKEN_KEY!) as UserEntity;

        req.user = user;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}