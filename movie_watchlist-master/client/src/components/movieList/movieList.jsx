// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteMovie, fetchMovies, toggleWatched } from '../../redux/movieSlice.js';
// import MovieEditForm from '../movieEditForm/movieEditForm.jsx';
// import "./movieList.css";
// import MovieAddForm from '../movieAddForm/movieAddForm.jsx';
// import FilterMovie from '../filterMovie/filterMovie.jsx';

// const MovieList = () => {
//     const dispatch = useDispatch();
//     // used useSelector to get the movies, movie status, & error from store
//     const movies = useSelector((state) => state.movies.movies);
//     const movieStatus = useSelector((state) => state.movies.status);
//     const error = useSelector((state) => state.movies.error);
//     const [editingMovie, setEditingMovie] = useState(null);
//     const [addMovieForm, setAddMovieForm] = useState(false);
//     const [filteredMovie, setFilteredMovie] = useState(movies)

//     // Used useEffect for updating the movies, filtered movie when movieStatus, movies are changed
//     useEffect(() => {
//         if (movieStatus === 'idle') {
//             dispatch(fetchMovies());
//         }
//         setFilteredMovie(movies)
//     }, [movieStatus, movies, dispatch]);

//     // Deleting movie using id by dispatching deleteMovie action
//     const handleDelete = (id) => {
//         const confirmation = window.confirm("Click 'OK' if you want to delete this Movie!")
//         if(confirmation){
//             dispatch(deleteMovie(id));
//             setEditingMovie(null)
//         }
//     };

//     // Handling watched toggle using id by dispatching toggleWatched action
//     const handleToggleWatched = (id) => {
//         dispatch(toggleWatched(id));
//     };

//     // Showing edit form to edit the movie details
//     const handleEdit = (movie) => {
//         setAddMovieForm(false)
//         setEditingMovie(movie);
//     };

//     // Filter function to get the filter movies list as per gerne
//     const filterMovie = (genre)=>{
//         if(genre === "all"){
//             setFilteredMovie(movies)
//         }else{
//             const filtered = movies.filter(m => m.genre === genre)
//             setFilteredMovie(filtered)
//         }
//     }

//     // Showing loading text till the movie didn't gets loaded from the db 
//     if (movieStatus === 'loading') {
//         return <div>Loading...</div>;
//     }

//     // Showing error is failed to fetch the movie 
//     if (movieStatus === 'failed') {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className='movie-list'>
//             <div className='filter-container'>
//             <h2>Movies</h2>
//             <FilterMovie filterMovie={filterMovie}/>
//             </div>
//             {/* show the add movie form or the edit movie form */}
//             {
//                 (addMovieForm || editingMovie)?(editingMovie? (
//                     <MovieEditForm 
//                     movie={editingMovie} 
//                     closeForm={() => setEditingMovie(null)} 
//                     />
//                 ):(<MovieAddForm setAddMovieForm={setAddMovieForm}/>)):
//                 <button onClick={()=>setAddMovieForm(true)} className='btn-add-form'>Add Movie</button>
//             }

//             {/* show the filtered movies list & if no match found show this text*/}
//             {
//                 (filteredMovie.length<1)?(<h3>No movie available for this genre!</h3>
//                 ):(
//                 <ul>
//                 {filteredMovie.map((movie) => (
//                     <li key={movie._id}>
//                         <div className='img-container'>
//                             <img src={movie.imageUrl} className='movie-img' alt='Movie-Image'/>   
//                         </div>
//                         <span><b id='movie-title'>{movie.title}</b> - {movie.genre} ({movie.releaseYear})
//                         <div className='starts-container'>
//                         {[...Array(5)].map((_, index) => ( 
//                             (index<movie.rating)?
//                                 <i key={index} className="fa-solid fa-star star"></i>
//                             :<i class="fa-regular fa-star star-outline"></i>
//                         ))}
//                         </div>
//                         <br/>
//                         <span><b>Review:</b> {movie.review}</span>
//                         <span className='movie-desc'>{movie.description}</span> <br/> 
//                         </span>
//                         <div className='btns'>
//                             <button onClick={() => handleToggleWatched(movie._id)}>
//                                 {movie.watched ? <i class="fa-solid fa-eye-slash icon-close"></i> : <i class="fa-solid fa-eye icon-open"></i>}
//                             </button>
//                             <button onClick={() => handleEdit(movie)} className='btn-edit'>Edit</button>
//                             <button onClick={() => handleDelete(movie._id)} className='btn-del'>Delete</button>
//                         </div>
//                     </li>
//                     ))}
//                 </ul>
//                 )
//             }
            
            
//         </div>
//     );
// };

// export default MovieList;


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMovie, fetchMovies, toggleWatched } from '../../redux/movieSlice.js';
import MovieEditForm from '../movieEditForm/movieEditForm.jsx';
import "./movieList.css";
import MovieAddForm from '../movieAddForm/movieAddForm.jsx';
import FilterMovie from '../filterMovie/filterMovie.jsx';

const MovieList = () => {
    const dispatch = useDispatch();
    // Get movies, movie status, and error from store
    const movies = useSelector((state) => state.movies.movies || []); // Ensure movies is an empty array if undefined
    const movieStatus = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);
    const [editingMovie, setEditingMovie] = useState(null);
    const [addMovieForm, setAddMovieForm] = useState(false);
    const [filteredMovie, setFilteredMovie] = useState([]);

    // useEffect to update the movies and filteredMovie when movieStatus or movies change
    useEffect(() => {
        if (movieStatus === 'idle') {
            dispatch(fetchMovies());
        }
        setFilteredMovie(movies);
    }, [movieStatus, movies, dispatch]);

    // Deleting movie by dispatching deleteMovie action
    const handleDelete = (id) => {
        const confirmation = window.confirm("Click 'OK' if you want to delete this Movie!");
        if (confirmation) {
            dispatch(deleteMovie(id));
            setEditingMovie(null);
        }
    };

    // Toggling watched status
    const handleToggleWatched = (id) => {
        dispatch(toggleWatched(id));
    };

    // Handling edit movie
    const handleEdit = (movie) => {
        setAddMovieForm(false);
        setEditingMovie(movie);
    };

    // Filter movies based on genre
    const filterMovie = (genre) => {
        if (genre === "all") {
            setFilteredMovie(movies);
        } else {
            const filtered = movies.filter(m => m.genre === genre);
            setFilteredMovie(filtered);
        }
    };

    // Show loading text while fetching movies
    if (movieStatus === 'loading') {
        return <div>Loading...</div>;
    }

    // Show error if failed to fetch movies
    if (movieStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='movie-list'>
            <div className='filter-container'>
                <h2>Movies</h2>
                <FilterMovie filterMovie={filterMovie} />
            </div>

            {/* Add movie form or edit movie form */}
            {(addMovieForm || editingMovie) ? (editingMovie ? (
                <MovieEditForm 
                    movie={editingMovie} 
                    closeForm={() => setEditingMovie(null)} 
                />
            ) : (
                <MovieAddForm setAddMovieForm={setAddMovieForm} />
            )) : (
                <button onClick={() => setAddMovieForm(true)} className='btn-add-form'>Add Movie</button>
            )}

            {/* Show filtered movies or message if none available */}
            {(filteredMovie.length < 1) ? (
                <h3>No movie available for this genre!</h3>
            ) : (
                <ul>
                    {filteredMovie.map((movie) => (
                        <li key={movie._id}>
                            <div className='img-container'>
                                <img src={movie.imageUrl} className='movie-img' alt='Movie-Image' />
                            </div>
                            <span><b id='movie-title'>{movie.title}</b> - {movie.genre} ({movie.releaseYear})
                                <div className='stars-container'>
                                    {[...Array(5)].map((_, index) => (
                                        (index < movie.rating) ? 
                                            <i key={index} className="fa-solid fa-star star"></i>
                                            : <i key={index} className="fa-regular fa-star star-outline"></i>
                                    ))}
                                </div>
                                <br />
                                <span><b>Review:</b> {movie.review}</span>
                                <span className='movie-desc'>{movie.description}</span> <br />
                            </span>
                            <div className='btns'>
                                <button onClick={() => handleToggleWatched(movie._id)}>
                                    {movie.watched ? <i className="fa-solid fa-eye-slash icon-close"></i> : <i className="fa-solid fa-eye icon-open"></i>}
                                </button>
                                <button onClick={() => handleEdit(movie)} className='btn-edit'>Edit</button>
                                <button onClick={() => handleDelete(movie._id)} className='btn-del'>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieList;
