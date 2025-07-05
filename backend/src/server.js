import express from "express"
import cors from "cors";
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js"
import connectDB from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

//middleware
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.json()); // to parse JSON bodies
app.use(rateLimiter);

// custom middleware
// app.use((req, res, next) => {
//     console.log("Request Methodis :", req.method);
//     console.log("Request URL is :", req.url);
//     next();
// })

app.use("/api/notes", notesRoutes);

connectDB(() => {
    app.listen(port, () => {
        console.log("Server started on port", port);
    })
})
