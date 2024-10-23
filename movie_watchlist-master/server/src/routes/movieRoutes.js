import express from 'express';
import MovieController from '../controller/movieController.js';
const movieRouter = express.Router();

// creating new instance of movie controller
const movieController = new MovieController()

// Movie Routes
movieRouter.get('/', movieController.getMovies);
movieRouter.post('/', movieController.addMovie);
movieRouter.put('/:id', movieController.editMovie);
movieRouter.delete('/:id', movieController.deleteMovie);
movieRouter.patch('/:id/toggle-watched', movieController.toggleWatched);
movieRouter.patch('/:id/rate', movieController.rateMovie);
movieRouter.patch('/:id/review', movieController.reviewMovie);

export default movieRouter;