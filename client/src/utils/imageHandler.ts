export function imageHandler(
    file: File | File[],
    onSuccess: (previews: string | string[]) => void,
    onError?: (message: string | string[]) => void
) {
    if (Array.isArray(file) && file.length >= 1) {
        const previews: string[] = [];
        const errors: { fileName: string | undefined; error: string | undefined }[] = [];
        let completed = 0;

        file.forEach((f) => {
            const reader = new FileReader();
            reader.readAsDataURL(f);

            reader.onloadend = () => {
                completed++;
                if (typeof reader.result === "string") {
                    previews.push(reader.result);
                } else {
                    errors.push({
                        fileName: f.name,
                        error: reader.error?.message
                    });
                }
                if (completed === file.length) {
                    previews.length >= 1
                        ? onSuccess(previews)
                        : onError?.(errors.map(e => e.error ?? "Something went wrong"));
                }
            };
        });
    } else if (file instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                onSuccess(reader.result);
            } else {
                onError?.(reader.error?.message ?? "File preview failed");
            }
        };
    }
}


// export const readImage = (image: File): string => {
//     const reader = new FileReader();
//     reader.readAsDataURL(image);

//     reader.onloadend = () => {
//         if (typeof reader.result === "string") {
//             onSuccess(reader.result);
//         } else {
//             onError?.();

//         }