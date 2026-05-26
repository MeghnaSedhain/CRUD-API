import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/users", userRoute);

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");

    // START SERVER ONLY AFTER DB CONNECTS
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });