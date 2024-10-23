import React from "react";
import "./filterMovie.css"

const FilterMovie= ({filterMovie}) => {

    // Filter component for filtering moives based on genre

    return(
        <>
            <label className="filter-movie">
                <select name='genre' onChange={(e)=> filterMovie(e.target.value)}>
                    <option value="all">Show All</option>
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
        </>
    )
}

export default FilterMovie;