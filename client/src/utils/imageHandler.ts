export function imageHandler(
    file: File,
    onSuccess: (base64: string) => void,
    onError?: () => void
) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
        if (typeof reader.result === "string") {
            onSuccess(reader.result);
        } else {
            onError?.();
        }
    };
}
