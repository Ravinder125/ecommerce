import { useEffect, useState } from "react";

export const useImageHandler = (files: File[]): string[] => {
    const [previews, setPreviews] = useState<string[]>([])

    useEffect(() => {
        if (!files?.length) {
            setPreviews([])
            return;
        }


    // Guard: filter out anything that isn't actually a File
    const validFiles = files.filter(f => f instanceof File)

    if (!validFiles.length) {
        setPreviews([])
        return
    }

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviews(urls)

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url))
        }

    }, [files])

    return previews
}