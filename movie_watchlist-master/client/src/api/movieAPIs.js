import axios from 'axios';

// node API
const API = 'http://localhost:8081/movies'; 

// fetching the movies
export const getMoviesApi = () => {
    return axios.get(API);
};

// adding new movie
export const addMovieApi = (movie) => {
    return axios.post(API, movie);
};

// updaing a movie by id
export const updateMovieApi = (id, updatedMovie) => {
    return axios.put(`${API}/${id}`, updatedMovie);
};

// deleting a movie by id
export const deleteMovieApi = (id) => {
    return axios.delete(`${API}/${id}`);
};

// toggle a movie watched/unwatched by id
export const toggleWatchedApi = (id) => {
    return axios.patch(`${API}/${id}/toggle-watched`);
};

// Give rating to a movie by id
export const rateMovieApi = (id, rating) => {
    return axios.post(`${API}/${id}/rate`, { rating });
};

// Give review to a movie by id
export const reviewMovieApi = (id, review) => {
    return axios.post(`${API}/${id}/review`, { review });
};


