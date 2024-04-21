import { Request, Response, NextFunction } from 'express';
const winston = require('winston');
import dotenv from "dotenv";

dotenv.config();

// Create a Winston logger instance
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', // Set the default log level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamps to logs
        winston.format.printf((info: any) => {
            return `${info.timestamp} ${info.level}: ${info.message}`; // Define log format
        })
    ),
    transports: [
        new winston.transports.Console() // Log to console
    ]
});

// Middleware function for logging incoming requests
export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${new Date().toUTCString()} ${req.method} ${req.originalUrl} - ${duration}ms`);
    });
    next();
}

export default requestLogger;
