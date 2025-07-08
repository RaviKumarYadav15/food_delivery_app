import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))

import foodRoutes from "./src/routes/food.routes.js";
import healthcheckRouter from './src/routes/healthcheck.route.js'
import userRoutes from "./src/routes/user.routes.js";
import cartRoutes from "./src/routes/cart.routes.js"
import orderRoutes from "./src/routes/order.routes.js"

app.use("/api/v1/healthcheck",healthcheckRouter)
app.use("/api/v1/food", foodRoutes); 
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRoutes)
app.use("/api/v1/order",orderRoutes)

export {app}