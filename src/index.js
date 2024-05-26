import dotenv from "dotenv"

import connectDB from "./db/index.js";      // importing db connection function from db folder
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

connectDB()    
.then(function(){
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);    
    })
})
.catch(function(error){
    console.log("MongoDB Conection Failed !!!");
    
})
 /* Here we are invoking connectDB() function in index.js file from db/index.js folder. This is async function and whenever async func completed it always return promise. 
    So here we are using .then() and .catch() to handle response and error.*/