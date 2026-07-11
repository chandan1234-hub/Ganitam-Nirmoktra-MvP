import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/db.connection.js"

dotenv.config({
    path: "./.env",
})

await connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERROR :", error)
            throw error;
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`MongoDB connection with Express is successful on port ${process.env.PORT || 8000}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed", err);
    })
