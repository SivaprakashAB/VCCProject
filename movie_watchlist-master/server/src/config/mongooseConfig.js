// src/config/mongooseConfig.js
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load the .env file
dotenv.config();

// Getting MongoDB URL from .env file
const url = process.env.MONGODB;

// Connecting to MongoDB
export const connectDB = async () => {
    try {
        if (!url) {
            throw new Error('MONGODB_URI is not defined');
        }
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB is now connected using mongoose");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the process if connection fails
    }
};
