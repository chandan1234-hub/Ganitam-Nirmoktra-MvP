import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/db.connection.js"

dotenv.config({
    path: "./.env",
})

await connectDB()

app.get('/', (req, res) => {
    res.send("hello")
})
app.post('/', (req, res) => {
    console.log('Contact form received:', req.body)
    res.status(201).json({
        success: true,
        message: 'Contact form received successfully',
    })
})
app.on("error", (error) => {
    console.log("ERROR :", error)
    throw error;
})

if (!process.env.VERCEL) {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`MongoDB connection with Express is successful on port ${process.env.PORT || 8000}`);
    })
}

export default app
