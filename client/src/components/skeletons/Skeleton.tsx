
interface SkeletonProps {
    width?: string;
    height?: string;
    radius?: string;
    style?: React.CSSProperties
}

export const Skeleton = ({
    width = "100%",
    height = "1rem",
    radius = "8px",
    style
}: SkeletonProps) => {
    return (
        <div
            className="skeleton"
            style={{ width, height, borderRadius: radius, ...style }}
        />
    );
};
