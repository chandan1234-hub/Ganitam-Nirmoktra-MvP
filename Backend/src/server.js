import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/db.connection.js"


const port = process.env.PORT || 8000

const app = express()

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log('ERROR :', error)
            throw error
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`MONGODB connection with Express is Successful on port ${process.env.PORT} `);
        })
    })
    .catch((err) => {
        console.log("MONGODB conncection is failed", err);
    })