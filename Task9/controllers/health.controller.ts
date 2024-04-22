import { Request, Response } from "express";
import { Pool } from "pg";

import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
});

export const checkHealth = async (req: Request, res: Response) => {
  try {
    // Attempt to connect to the database
    const client = await pool.connect();
    
    // If the connection is successful, send a success response
    res.status(200).json({ message: "PostgreSQL connection is healthy" });

    // Release the client back to the pool
    client.release();
  } catch (error) {
    // If there's an error connecting to the database, send an error response
    res.status(500).json({ message: "Failed to connect to PostgreSQL", error });
  }
};

export default checkHealth;