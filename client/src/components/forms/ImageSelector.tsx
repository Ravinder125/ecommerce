import { useMemo } from "react";
import { useImageHandler } from "../../hooks/useImageHandler";
import { ImageCarousel } from "../ImageCarousel";

type ImageSelector = {
    name: string;
    value: File[];
    onChange: (files: File[]) => void;
    required?: boolean;
    label?: string;
    multiple?: boolean
    existingImages?: string[]
    setDeleteImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImageSelector = ({
    name,
    onChange,
    label = "Choose Image",
    value = [],
    multiple = false,
    required = false,
    setDeleteImages,
    existingImages = []
}: ImageSelector) => {
    console.log("Image rendered")

    const previews = useImageHandler(value)

    const allPreviews = useMemo(
        () => [...existingImages, ...previews]
        , [previews, existingImages])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const filesArr = Array.from(files);

        if (!multiple) {
            onChange([filesArr[0]])
        } else {
            onChange([...value, ...filesArr])
        }
    }



    return (
        <div className="input-box--image">
            <input
                hidden
                type="file"
                id={name}
                onChange={handleChange}
                size={3}
                multiple={multiple}
                required={required}
                accept="image/*"
            />

            <label htmlFor={name} className="image-input">
                {label}
            </label>

            {/* {allPreviews.length > 0 && (
                <ImageCarousel images={allPreviews} onRemove={handleRemove} />
            )} */}
        </div >
    )
}

