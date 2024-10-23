import React from 'react';
import MovieList from '../../components/movieList/movieList.jsx';
import "./home.css"

const Home = () => {
    return (
        <div className='home'>
            <h1>Movie Watchlist</h1>
            <MovieList />
        </div>
    );
};

export default Home;