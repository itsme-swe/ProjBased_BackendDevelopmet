import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
         // Here "MONGODB_URI" is the path of our db connection with MongoDB Atlas and "DB_NAME" is our database name.
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // Here 'connectionInstance.connection.host' "connectionInstance" object represents the connection. __ "connection" property represents detail about the connection and "host" property represents the host name or IP address.
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
          
        
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1)
    }
}

export default connectDB