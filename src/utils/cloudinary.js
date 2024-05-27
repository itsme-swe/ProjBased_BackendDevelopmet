// Setting up cloudiary to manage our files

import { v2 as cloudinary } from "cloudinary";

import fs from "fs"

// config cloudinary...all ths code is copy pasted from cloudinary
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath, retryCount = 3) => {
    try {
        if (!localFilePath) {
            console.error("No file path provided!");
            return null
        }     // throw error("Not able to find the Path !!")    // Here instead of throwing an error we can also "return null" and this condition says {agar "localFilePath" nhi ha toh 1 error bhejo}    
        
        // Now upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "auto",
                timeout: 60000
            });

        // Now if file is uploaded successfully then
        console.log("File has been uploaded on cloudinary", response.url);
        
        fs.unlinkSync(localFilePath);
        return response     // This will return whole response to user 
        
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);

        if (error.http_code === 499 && retryCount > 0) {
            console.log(`Retrying upload... Attempts left: ${retryCount}`);
            return uploadOnCloudinary(localFilePath, retryCount - 1);
            
        }
        // Now removing file from our local server
        fs.unlinkSync(localFilePath)
        return null
    }
} 

export { uploadOnCloudinary }