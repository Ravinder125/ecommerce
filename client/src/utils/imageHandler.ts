export function imageHandler(
    file: File,
    onSuccess: (base64: string) => void,
    onError?: () => void
) {
    const reader = new FileReader();
    console.log()

    reader.readAsDataURL(file);

    reader.onloadend = () => {
        if (typeof reader.result === "string") {
            onSuccess(reader.result);
        } else {
            onError?.();
        }
    };
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