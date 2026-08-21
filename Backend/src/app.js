import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'

const app = express();

app.use(cors())

// app.use(express.json({
//     limit: "16kb",
// }))

app.use(bodyParser.json())
// app.use(express.urlencoded({
//     extended: true,
//     limit: "16kb",
// }))


// app.use(express.static("public"))
// app.use(cookieParser())


export  { app };