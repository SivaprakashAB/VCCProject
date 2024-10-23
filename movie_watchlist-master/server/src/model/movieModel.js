import mongoose from "mongoose";

// Created movie schema using mongoose
const movieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,  // Only the title is mandatory
        unique: true     // Ensures no duplicate titles are allowed
    },
    description: { 
        type: String, 
        default: ""      // Default to an empty string if no description is provided
    },
    releaseYear: { 
        type: Number, 
        default: new Date().getFullYear() // Default to the current year
    },
    genre: { 
        type: String, 
        default: ""      // Default to an empty string if no genre is provided
    },
    imageUrl: { 
        type: String, 
        default: "https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg" // Default image URL
    },
    watched: { 
        type: Boolean, 
        default: false    // Default to false, indicating the movie is not watched
    },
    rating: { 
        type: Number, 
        min: 0, 
        max: 5, 
        default: 0        // Default rating
    },
    review: { 
        type: String, 
        default: ""       // Default to an empty string for reviews
    }
});

// Created movie model using mongoose
const movieModel = mongoose.model("Movie", movieSchema);
export default movieModel;
