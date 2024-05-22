// Setting up cloudiary to manage our files
import { v2 as cloudinary} from "cloudinary";

import fs from "fs"

// config cloudinary...all ths code is copy pasted from cloudinary
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECERET // Click 'View Credentials' below to copy your API secret
});
