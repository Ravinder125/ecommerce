import { useEffect, useState } from "react";
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useImageHandler } from "../../hooks/useImageHandler";

type ImageSelector = {
    name: string;
    value: File[];
    onChange: (files: File[]) => void;
    required?: boolean;
    label?: string;
    multiple?: boolean
}

export const ImageSelector = ({
    name,
    onChange,
    label = "Choose Image",
    value = [],
    multiple = false,
    required = false
}: ImageSelector) => {

    // const [previews, setPreviews] = useState<string[]>([])

    // useEffect(() => {
    //     if (!value.length) {
    //         setPreviews([])
    //         return;
    //     }

    //     const urls = value.map(file =>
    //         URL.createObjectURL(file)
    //     );

    //     return () => {
    //         urls.forEach(url => URL.revokeObjectURL(url))
    //     }

    // }, [value])

    const previews = useImageHandler(value)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const filesArr = Array.from(files);

        if (!multiple) {
            onChange([filesArr[0]])
        } else {
            onChange(filesArr)
        }
    }

    const handleRemove = (idx: number) => {
        const updated = value.filter((_, i) => i !== idx)
        onChange(updated);
    }

    return (
        <div>
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

            {previews.length > 0 && (
                <div className="image-preview">
                    {previews.map((src, index) => (
                        <div key={index}>
                            <img src={src} alt="preview" />
                            <MdDelete onClick={() => handleRemove(index)} />
                        </div>
                    ))}
                </div>
            )}
        </div >
    )
}

const ImageCarousel = () => {

}