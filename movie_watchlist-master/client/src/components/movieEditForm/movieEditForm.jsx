import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMovie } from '../../redux/movieSlice';
import "./movieEditForm.css"

const MovieEditForm = ({ movie, closeForm }) => {
    // used useState for storing form's field state
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    const [releaseYear, setReleaseYear] = useState(movie.releaseYear);
    const [genre, setGenre] = useState(movie.genre);
    const [imageUrl, setImageUrl] = useState(movie.imageUrl);
    const [rating, setRating] = useState(movie.rating);
    const [review, setReview] = useState(movie.review);
    const dispatch = useDispatch();

    // Updating existing movie by dispatching updateMovie action with the new movie data
    const onSubmit = (e) => {
        e.preventDefault();
        const updatedMovie = { id: movie._id, title, description, releaseYear, genre, imageUrl, rating, review};
        dispatch(updateMovie(updatedMovie));
        closeForm();
    };

    // handing form close
    const handleClose = ()=>{
        closeForm()
    }

    return (
        <form onSubmit={onSubmit} className='edit-movie-form'>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Release Year:
                <input
                    type="number"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                />
            </label>
            <label>
                Genre:
                <select name='genre' value={genre} onChange={(e)=> setGenre(e.target.value)}>
                    <option value="" selected disabled hidden>Select a genre</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Drama">Drama</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Animated">Animated</option>
                </select>
            </label>
            <label>
                ImageUrl:
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </label>
            <label>
                Rating:
                <select name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>
            <label>
                Review:
                <input
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </label>
            <div className='btn-container'>
                <button type="submit" className='btn-update'>Update Movie</button>
                <button type="button" onClick={handleClose} className='btn-close'>Close</button>
            </div>
        </form>
    );
};

export default MovieEditForm;