// server.js
import app from "./index.js";
import { connectDB } from "./src/config/mongooseConfig.js";

// Default port number
const port = process.env.PORT;

// Connect to the database before starting the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Error connecting to the database:", err);
});
