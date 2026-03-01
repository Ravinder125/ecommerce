import {
    v2 as cloudinary,
    UploadApiErrorResponse,
    UploadApiResponse
} from 'cloudinary';
import { fileCleanup } from './fileCleanup.js';



// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "dsewrli3x",
    api_key: process.env.CLOUDINARY_API_KEY || "293763815847446",
    api_secret: process.env.CLOUDINARY_API_SECRET || "i8XBwOSQtzFUlFgQJ0oN84yyFBM",
})

// Upload image 
export const uploadOnCloudinary = async (localFilePath: string)
    : Promise<void | UploadApiErrorResponse | UploadApiResponse> => {
    return await cloudinary.uploader
        .upload(localFilePath, {
            resource_type: "image",
            folder: "E_commerce",
            use_filename: true,
            unique_filename: true,
            overwrite: true,
            format: "webp"
        })
        .then(result => {
            console.log("File successfully uploaded on Cloud Storage")
            return result
        })
        .catch((error) => console.error('Error while uploading image on Cloudinary', error))
        .finally(() => fileCleanup(localFilePath))
}

export const deleteOnCloudinary = async (publicId: string)
    : Promise<void | UploadApiErrorResponse | UploadApiResponse> => {
    return await cloudinary.uploader.destroy(publicId)
        .then(() => console.log("Image successfully deleted"))
        .catch((error) => console.error("Error while deleting the image", error))
}


