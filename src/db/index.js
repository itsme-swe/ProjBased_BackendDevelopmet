import mongoose from "mongoose";

import { DB_NAME } from "../constants";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // Here "MONGODB_URI" is the path of our db connection with MongoDB Atlas and "DB_NAME" is our database name.
        
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        // Here 'connectionInstance.connection.host' "connectionInstance" object represents the connection. __ "connection" property represents detail about the connection and "host" property represents the host name or IP address.  
        
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1)
    }
}

export default connectDB