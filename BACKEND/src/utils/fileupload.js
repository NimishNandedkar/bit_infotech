import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

          
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (file) => {
    
    try {
        if (!file) {
            console.log("No file to upload");
            return null;
        }
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: "Bit_infotech/StudentCorner/Projects",
    });
    
        fs.unlinkSync(file);
        console.log("File uploaded to Cloudinary");
        console.log(result.url);
        return result;
        
    } catch (error) {
        fs.unlinkSync(file);
        console.log(error + "File not uploaded to Cloudinary ");
        return null;
    }
  
}

export default uploadCloudinary;