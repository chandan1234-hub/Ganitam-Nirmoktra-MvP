import express from "express"
import dotenv from "dotenv"

const port = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => {
    res.send("the app is working")
})

app.listen(port, () => {
    console.log(`the server is working on port ${process.env.PORT}`);
})