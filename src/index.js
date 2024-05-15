import dotenv from "dotenv"

import connectDB from "./db/index.js";      // importing db connection function from db folder

dotenv.config({
    path: './env'
})

connectDB()     // Invoking connectDB() function in index.js file 