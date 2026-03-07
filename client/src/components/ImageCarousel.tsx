import { useState } from "react";
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const ImageCarousel = ({
    images,
    onRemove
}: {
    images: string[];
    onRemove?: (idx: number) => void;
}) => {
    const [activeIdx, setActiveIndex] = useState<number>(0);
    console.log("carousel rendered")

    const goPrev = () => {
        setActiveIndex(prev => Math.max(prev - 1, 0));
    };

    const goNext = () => {
        setActiveIndex(prev => Math.min(prev + 1, images.length - 1));
    };

    const handleRemove = (idx: number) => {
        onRemove && onRemove(idx)

        setActiveIndex(prev =>
            prev > 0 ? prev - 1 : 0
        )
    }
    return (
        <div className="image-carousel">

            <button
                disabled={activeIdx === 0}
                onClick={goPrev}
            >
                <MdKeyboardArrowLeft />
            </button>

            <div>
                <img src={images[activeIdx]} alt="preview" loading="lazy" />
                {onRemove && (
                    <MdDelete onClick={() => handleRemove(activeIdx)} />
                )}
            </div>

            <button
                disabled={activeIdx === images.length - 1}
                onClick={goNext}
            >
                <MdKeyboardArrowRight />
            </button>

        </div>
    );
};