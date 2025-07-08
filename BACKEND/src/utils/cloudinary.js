import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv"

dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        const result = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto"  // auto-detect image/video/pdf
            }
        );

        console.log(`file uploaded on cloudinary. File src ${result.url}`)

        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        return result; // returning the result , as it might need later
    } 
    catch (error) {
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {
    try{
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return null;
    }
}

export {uploadOnCloudinary, deleteFromCloudinary};