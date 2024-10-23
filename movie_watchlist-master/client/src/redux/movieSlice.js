import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addMovieApi, getMoviesApi, updateMovieApi, deleteMovieApi, toggleWatchedApi, rateMovieApi, reviewMovieApi} from '../api/movieAPIs';
import { toast } from 'react-toastify';

const initialState = {
    movies: [],
    status: 'idle',
    error: null,
};

// For notification
const notify = (msg, type) => toast[type](msg);

// Async thunk to fetch movies
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await getMoviesApi();
    return response.data;
});

// Async thunk to add a new movie
export const addMovie = createAsyncThunk('movies/addMovie', async (newMovie) => {
    const response = await addMovieApi(newMovie);
    return response.data;
});

// Async thunk to update a movie
export const updateMovie = createAsyncThunk('movies/updateMovie', async (updatedMovie) => {
    const response = await updateMovieApi(updatedMovie.id, updatedMovie);
    return response.data;
});

// Async thunk to delete a movie
export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
    await deleteMovieApi(id);
    return id;
});

// Async thunk to toggle watched status
export const toggleWatched = createAsyncThunk('movies/toggleWatched', async (id) => {
    const response = await toggleWatchedApi(id);
    return response.data;
});

// Async thunk to rate a movie
export const rateMovie = createAsyncThunk('movies/rateMovie', async ({ id, rating }) => {
    const response = await rateMovieApi(id, rating);
    return response.data;
});

// Async thunk to review a movie
export const reviewMovie = createAsyncThunk('movies/reviewMovie', async ({ id, review }) => {
    const response = await reviewMovieApi(id, review);
    return response.data;
});

// Movie Slice
const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addMovie.fulfilled, (state, action) => {
                state.movies.push(action.payload);
                notify(`New Movie Added Successfully!`, "success")
            })
            .addCase(addMovie.rejected, (state, action) => {
                if(action.error.message.includes("409")){
                    notify("Movie already exist!", "warn")
                };
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                const index = state.movies.findIndex(movie => movie._id === action.payload._id);
                if (index !== -1) {
                    state.movies[index] = action.payload;
                    notify("Movie detail updated Successfully!", "info")
                }
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.movies = state.movies.filter(movie => movie._id !== action.payload);
                notify("Movie Deleted Successfully!", 'success')
            })
            .addCase(toggleWatched.fulfilled, (state, action) => {
                const index = state.movies.findIndex(movie => movie._id === action.payload._id);
                if (index !== -1) {
                    state.movies[index].watched = action.payload.watched;
                    notify(`${state.movies[index].title} Movie ${action.payload.watched?"Watched":"Unwatched"}!`, "info")
                }
            })
            .addCase(rateMovie.fulfilled, (state, action) => {
                const index = state.movies.findIndex(movie => movie._id === action.payload._id);
                if (index !== -1) {
                    state.movies[index].rating = action.payload.rating;
                    notify("Movie detail updated Successfully!", "info")
                }
            })
            .addCase(reviewMovie.fulfilled, (state, action) => {
                const index = state.movies.findIndex(movie => movie._id === action.payload._id);
                if (index !== -1) {
                    state.movies[index].review = action.payload.review;
                    notify("Movie detail updated Successfully!", "info")
                }
            });
    },
});

export default moviesSlice.reducer;