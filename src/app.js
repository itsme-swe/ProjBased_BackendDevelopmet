import express from "express"
import cors from "cors"     // middleware for browsing security
import cookieParser from "cookie-parser"    // middleware to handle cookies

const app = express()

// configuring CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))                              // configuring .json format setting limit to accept json 

app.use(express.urlencoded({extended: true, limit: "16kb"}))       // configuring for URL's 

app.use(express.static("public"))       // Use to keep assets like pdf files, images etc in our local server so we create one folder by the name of public

app.use(cookieParser())


export {app}