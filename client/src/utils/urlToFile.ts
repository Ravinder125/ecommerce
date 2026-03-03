export async function urlToFile(
    url: string,
    filename?: string
): Promise<File> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch image from URL");
    }

    const blob = await response.blob();

    const fileName =
        filename ||
        url.split("/").pop()?.split("?")[0] ||
        "image";

    return new File([blob], fileName, {
        type: blob.type,
    });
}