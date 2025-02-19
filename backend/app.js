import express from "express";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:3000",  // Allow only the frontend's origin
      credentials: true,  // Allow cookies to be sent with the request
    })
  );

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/chat', chatRoutes);

app.listen(5000, ()=>{
    connectDB();
    console.log(`Server is running on http://localhost:5000`);
})