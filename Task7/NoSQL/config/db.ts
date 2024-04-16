import mongoose from 'mongoose';

export async function connect(): Promise<void> {
    const { MONGO_URI } = process.env;

    console.log(MONGO_URI);
    

    if (!MONGO_URI) {
        console.log("Please provide DataBase URI to connect. exiting now...");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to database");
    } catch (e) {
        console.log("DataBase connection failed. exiting now...");
        console.error(e);
        process.exit(1);
    }
}


export const closeDatabaseConnection = async (): Promise<void> => {
    try {
      await mongoose.connection.close();
      console.log("Database connection closed");
    } catch (error) {
      console.error("Error while closing the database connection: ", error);
    }
  };