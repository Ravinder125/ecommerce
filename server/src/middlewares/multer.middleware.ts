import multer from 'multer';
// import { randomBytes, randomBytes } from 'crypto';
import { Request } from 'express';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (_, __, cb) {
        cb(null, "./public/temp")
    },
    filename: function (_, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    },
});


// File Filter
const fileFilter = (
    _: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    // Accept only png, jpeg, jpg and web images
    const allowedTypes = ["image/jpg", "image/png", "image/jpeg", "image/webp"]
    allowedTypes.indexOf(file.mimetype) !== -1
        ? cb(null, true)
        : cb(new Error('Invalid file type. Only JPG, JPEG, PNG and WEBP formats are allowed'));
}

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    } // 5MB limit
})