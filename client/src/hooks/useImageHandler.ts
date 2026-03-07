import { useEffect, useState } from "react";

export const useImageHandler = (files: File[]): string[] => {
    const [previews, setPreviews] = useState<string[]>([])
    // console.log("image handler state rendered")
    useEffect(() => {
        if (!files.length) {
            setPreviews([])
            return;
        }
        // console.log("image handler effect rendered")

        const urls = files.map(file =>
            URL.createObjectURL(file)
        );
        setPreviews(urls)

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url))
        }

    }, [files])

    // console.log("image handler comp rendered")
    return previews
}