import fs from 'fs'

export const fileCleanup = (localFilePath: string) => {
    fs.unlink(localFilePath, () =>
        console.log("Image successful locally deleted"))
}