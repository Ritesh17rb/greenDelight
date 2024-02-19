import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan"
import connectDB from "./config/db.js";


// Configure env
dotenv.config()

// database config
connectDB();


// Rest object
const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))

// Rest APIs

app.get('/', (req, res) => {
    res.send("<h1>Hello HomePage</h1>")
})

// PORT
const PORT = process.env.PORT || 5000

// Run Listen

app.listen(PORT, () => {
    console.log(`Server Running on PORT : ${PORT}`.bgCyan.white)
})