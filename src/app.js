import express from "express"
import cors from "cors"     // middleware for browsing security
import cookieParser from "cookie-parser"    // middleware to handle cookies

const app = express()

// configuring CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))                              // configuring .json() middleware and setting limit to accept json format files

app.use(express.urlencoded({extended: true, limit: "16kb"}))       // configuring for URL middleware to accept data coming from URL

app.use(express.static("public"))       // Use to keep assets like pdf files, images etc in our local server so we create one folder by the name of public

app.use(cookieParser())

// Importing routes after the middleware config
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/users"/userRouter)

export { app }