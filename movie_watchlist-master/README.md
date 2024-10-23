# Movie Watchlist Application

This is a MERN-Stack movie management application that allows users to add, edit, delete, and view movies. Users can also mark movies as watched or unwatched, rate movies, and write reviews. The application is built with a Node.js backend and a React frontend, using Redux Toolkit for state management.

## Table of Contents

- features
- technologies
- setup-and-installation
- backend
    - api-endpoints
    - running-the-server
- frontend
    - running-the-client
- usage

## Features

- **Movie Management**:
    - Add, edit, and delete movies.
    - Mark movies as watched or unwatched.
- **Rating and Reviewing**:
    - Rate movies from 1 to 5 stars.
    - Write and view reviews for movies.
- **User Interface**:
    - Easy-to-use interface built with React.
    - State management using Redux Toolkit.

## Technologies

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Redux Toolkit, Axios, toastify react
- **Styling**: CSS

## Setup and Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB (running instance or cloud-based)

### Backend

1. **Clone the repository**:

    ```
    git clone https://github.com/Rishav-2024/movie_watchlist.git
    cd movie-watchlist-app
    ```

2. **Navigate to the `backend` directory**:

    ```
    cd server
    ```

3. **Install dependencies**:

    ```
    npm install
    ```

4. **Set up environment variables**:

    Create a `.env` file in the `backend` directory with the following content:

    ```dotenv
    PORT=8081
    MONGO_URI=mongodb://localhost:27017/moviesdb
    ```

    Replace `mongodb://localhost:27017/moviesdb` with your MongoDB URI if necessary.

5. **Run the server**:

    ```
    node server.js
    ```

    The server will start at `http://localhost:8081`.

### Frontend

1. **Navigate to the `frontend` directory**:

    ```
    cd ../client
    ```

2. **Install dependencies**:

    ```
    npm install
    ```

3. **Start the client**:

    ```
    npm start
    ```

    The client will start at `http://localhost:3000`.

## Backend

### API Endpoints

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/movies`                   | Get all movies                     |
| POST   | `/movies`                   | Add a new movie                    |
| PUT    | `/movies/:id`               | Update a movie                     |
| DELETE | `/movies/:id`               | Delete a movie                     |
| PATCH  | `/movies/:id/toggle-watched`| Toggle watched status of a movie   |
| POST   | `/movies/:id/rate`          | Rate a movie                       |
| POST   | `/movies/:id/review`        | Review a movie                     |

### Running the Server

Start the server using:

```
node server.js

```


### Usage

1. Start the backend server: Ensure the backend server is running at http://localhost:8081.

2. Start the frontend client: Run the React application at http://localhost:3000.

3. Interact with the application:

- Add new movies using the form provided.
- Edit or delete existing movies from the list.
- Mark movies as watched or unwatched.
- Rate and review movies by clicking the "Edit" button.