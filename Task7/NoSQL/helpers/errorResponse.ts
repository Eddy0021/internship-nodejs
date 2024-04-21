import type { Response } from "express";

export function errorHandler(res: Response, message: String, error: any): void {
    console.error(message, error);
    res.status(500).json({ error: { message: "Internal server error." } });
}