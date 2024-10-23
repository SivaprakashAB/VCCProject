import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../redux/movieSlice.js';
import "./movieAddForm.css";

const MovieAddForm = ({setAddMovieForm}) => {
    // used useState for storing form's field state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [genre, setGenre] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const dispatch = useDispatch();

    // Adding new movie by dispatching addMovie action & passed new movie 
    const onSubmit = (e) => {
        e.preventDefault();
        const newMovie = { title:title.trim(), description, releaseYear, genre, imageUrl};
        dispatch(addMovie(newMovie));
        setTitle('')
        setDescription('')
        setReleaseYear('')
        setGenre('')
        setImageUrl('')
    };

    return (
        <form onSubmit={onSubmit} className='add-movie-form'>
            <label>
                Tit             <input
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
            <div className='btn-container'>
                <button type="submit" className='btn-add'>Add Movie</button>
                <button onClick={()=>setAddMovieForm(false)} className='btn-close'>Close</button>
            </div>
        </form>
    );
};

export default MovieAddForm;