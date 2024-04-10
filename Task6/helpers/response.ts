import { Response } from "express";

export function sendApiResponse<T>(res: Response, statusCode: number, data?: T, error?: any): void {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ data: data, error: error }));
}
