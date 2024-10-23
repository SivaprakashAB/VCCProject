// import movieModel from "../model/movieModel.js";


// export default class MovieController {

//     // fetching movies from db
//     getMovies = async (req, res) => {
//         try {
//             const movies = await movieModel.find();
//             res.status(200).json(movies);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     };
    
//     // // adding new movie if not already added
//     // addMovie = async (req, res) => {
//     //     let { title, description, releaseYear, genre, imageUrl } = req.body;

//     //     if(imageUrl == ""){
//     //         imageUrl="https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg"
//     //     }
    
//     //     try {
//     //         const existingMovie = await movieModel.findOne({ title:title.toLowerCase()});

//     //         if (existingMovie) {
//     //             // If the movie already exists
//     //             return res.status(409).json({ message: 'Movie with this title already exists' });
//     //         }

//     //         const newMovie = new movieModel({ title:title.toLowerCase(), description, releaseYear, genre, imageUrl });
//     //         const savedMovie = await newMovie.save();
//     //         res.status(201).json(savedMovie);
//     //     } catch (error) {
//     //         res.status(500).json({ message: error.message });
//     //     }
//     // };

//     addMovie = async (req, res) => {
//         console.log('Received request body:', req.body); // Add this line to log the request body
//         let { title, description, releaseYear, genre, imageUrl } = req.body;
    
//         if (imageUrl === "") {
//             imageUrl = "https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg";
//         }
//         try {
//             const existingMovie = await movieModel.findOne({ title: title.toLowerCase() });
    
//             if (existingMovie) {
//                 return res.status(409).json({ message: 'Movie with this title already exists' });
//             }
//             const newMovie = new movieModel({ title: title.toLowerCase(), description, releaseYear, genre, imageUrl });
//             const savedMovie = await newMovie.save();
//             res.status(201).json(savedMovie);
//         } catch (error) {
//             console.error('Error saving movie:', error); // Log any error
//             res.status(500).json({ message: error.message });
//         }
//     };
    

//     // Updating movie by id & data provided by the form body
//     editMovie = async (req, res) => {
//         const { id } = req.params;
//         let { title, description, releaseYear, genre, imageUrl, rating, review} = req.body;

//         if(imageUrl == ""){
//             imageUrl="https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg"
//         }

//         try {
//             const updatedMovie = await movieModel.findByIdAndUpdate(id, { title, description, releaseYear, genre, imageUrl, rating, review}, { new: true });
//             res.status(200).json(updatedMovie);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     };
    
//     // Deleting movie by id from db
//     deleteMovie = async (req, res) => {
//         const { id } = req.params;
    
//         try {
//             await movieModel.findByIdAndDelete(id);
//             res.status(200).json({ message: 'Movie deleted successfully' });
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     };
    
//     // toggling watched/unwatched movie
//     toggleWatched = async (req, res) => {
//         const { id } = req.params;
    
//         try {
//             const movie = await movieModel.findById(id);
//             movie.watched = !movie.watched;
//             const updatedMovie = await movie.save();
//             res.status(200).json(updatedMovie);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }; 

//     //adding rating to a movie by id in db 
//     rateMovie = async (req, res) => {
//         const { id } = req.params;
//         const { rating } = req.body;
    
//         try {
//             const movie = await movieModel.findById(id);
//             movie.rating = rating;
//             const updatedMovie = await movie.save();
//             res.status(200).json(updatedMovie);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     };
    
//     // adding review to a movie by id & text provided by form body
//     reviewMovie = async (req, res) => {
//         const { id } = req.params;
//         const { review } = req.body;
    
//         try {
//             const movie = await movieModel.findById(id);
//             movie.review = review;
//             const updatedMovie = await movie.save();
//             res.status(200).json(updatedMovie);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     };
// }

import movieModel from "../model/movieModel.js";

export default class MovieController {

    // Fetching movies from the database
    getMovies = async (req, res) => {
        try {
            const movies = await movieModel.find();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Adding new movie if not already added
addMovie = async (req, res) => {
    console.log('Received request body:', req.body); // Log the request body
    let { title, description = "", releaseYear = new Date().getFullYear(), genre = "", imageUrl } = req.body;

    // Set a default image if none is provided
    if (!imageUrl || imageUrl.trim() === "") {
        imageUrl = "https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg";
    }

    // Validate the title input
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        // Check if the movie already exists
        const existingMovie = await movieModel.findOne({ title: title.toLowerCase() });
        if (existingMovie) {
            return res.status(409).json({ message: 'Movie with this title already exists' });
        }

        // Create a new movie instance
        const newMovie = new movieModel({ 
            title: title.toLowerCase(), 
            description, 
            releaseYear, 
            genre, 
            imageUrl 
        });

        // Save the new movie to the database
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        console.error('Error saving movie:', error); // Log any error
        res.status(500).json({ message: error.message });
    }
};

    // Updating movie by id & data provided by the form body
    editMovie = async (req, res) => {
        const { id } = req.params;
        let { title, description, releaseYear, genre, imageUrl, rating, review } = req.body;

        // Set a default image if none is provided
        if (!imageUrl || imageUrl.trim() === "") {
            imageUrl = "https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg";
        }

        try {
            const updatedMovie = await movieModel.findByIdAndUpdate(id, 
                { title, description, releaseYear, genre, imageUrl, rating, review }, 
                { new: true }
            );
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Deleting movie by id from db
    deleteMovie = async (req, res) => {
        const { id } = req.params;
    
        try {
            await movieModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Toggling watched/unwatched movie
    toggleWatched = async (req, res) => {
        const { id } = req.params;
    
        try {
            const movie = await movieModel.findById(id);
            if (!movie) return res.status(404).json({ message: 'Movie not found' });

            movie.watched = !movie.watched;
            const updatedMovie = await movie.save();
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }; 

    // Adding rating to a movie by id in db 
    rateMovie = async (req, res) => {
        const { id } = req.params;
        const { rating } = req.body;
    
        try {
            const movie = await movieModel.findById(id);
            if (!movie) return res.status(404).json({ message: 'Movie not found' });

            movie.rating = rating;
            const updatedMovie = await movie.save();
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Adding review to a movie by id & text provided by form body
    reviewMovie = async (req, res) => {
        const { id } = req.params;
        const { review } = req.body;
    
        try {
            const movie = await movieModel.findById(id);
            if (!movie) return res.status(404).json({ message: 'Movie not found' });

            movie.review = review;
            const updatedMovie = await movie.save();
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}
