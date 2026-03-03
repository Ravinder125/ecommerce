import { useEffect, useState } from "react";

export const useImageHandler = (files: File[]): string[] => {
    const [previews, setPreviews] = useState<string[]>([])

    useEffect(() => {
        if (!files.length) {
            setPreviews([])
            return;
        }

        const urls = files.map(file =>
            URL.createObjectURL(file)
        );
        setPreviews(urls)

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url))
        }

    }, [files])

    return previews
}