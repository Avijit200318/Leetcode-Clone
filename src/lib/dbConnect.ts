import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {};

export const connectToDb = async (): Promise<void> => {
    if(connection.isConnected){
        console.log("Already connected to mongodb");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {
            dbName: process.env.DB_NAME
        });

        connection.isConnected = db.connections[0].readyState;

        console.log("Db connected successfully");
    } catch (error) {
        console.log("Databse connection faild: ", error);
        process.exit(1);
    }
}