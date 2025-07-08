import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\nMongoDB connected!`)
        console.log(`DB host: ${connectionInstance.connection.host}`)
        console.log(`DB name: ${connectionInstance.connection.name}`)
        console.log(`Port: ${connectionInstance.connection.port}`)
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
    }
}

export {connectDB}