// Setting up cloudiary to manage our files
import { v2 as cloudinary} from "cloudinary";
import { error } from "console";

import fs from "fs"

// config cloudinary...all ths code is copy pasted from cloudinary
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECERET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloud = async (localFilePath) => {
    try {
        if (!localFilePath) throw error("Not able to find the Path !!")    // Here instead of throwing an error we can also "return null" and this condition says {agar "localFilePath" nhi ha toh 1 error bhejo}    
        
        // Now upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "auto"
            })

        // Now if file is uploaded successfully then
        console.log("File has been uploaded on cloudinary", response.url);
        return response     // This will return whole response to user 
        
    } catch (error) {
        // Now removing file from our local server
        fs.unlinkSync(localFilePath)    // Removed the locally saved temp file as upload operation got failed
        return null
    }
} 

export { uploadOnCloud }