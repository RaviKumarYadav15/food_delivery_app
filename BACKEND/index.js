import { app } from "./app.js";
import { connectDB } from "./src/db/index.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at the port: ${PORT}`)
    })
})
.catch((error)=>{
    console.log(`MongoDB connection error: ${error}`)
})