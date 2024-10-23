import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';
import movieRouter from './src/routes/movieRoutes.js';

const app = express();

// Middleware for form data & cross origin
app.use(express.json())
app.use(cors());

// Movie Route
app.use('/movies', movieRouter)

// Default get route
app.get('/', (req, res)=>{
    res.send('Node.js API for "Movie Watchlist" application')
})

export default app;