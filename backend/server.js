import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB()
const app = express();

app.use('/api/users',userRoutes)

app.get("/", (req, res) => res.send("server ism ready"));

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
