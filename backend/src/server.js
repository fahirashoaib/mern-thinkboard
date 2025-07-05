import express from "express"
import cors from "cors";
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js"
import connectDB from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve(); // Get the current directory name

//middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors(
        {
            origin: "http://localhost:5173",
            credentials: true,
        }
    ));
}

app.use(express.json()); // to parse JSON bodies
app.use(rateLimiter);

// custom middleware
// app.use((req, res, next) => {
//     console.log("Request Methodis :", req.method);
//     console.log("Request URL is :", req.url);
//     next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

connectDB(() => {
    app.listen(port, () => {
        console.log("Server started on port", port);
    })
})
