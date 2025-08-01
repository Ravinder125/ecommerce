import fs from 'fs';
export const fileCleanup = (localFilePath) => {
    fs.unlink(localFilePath, () => console.log("Image successful locally deleted"));
};
