import { Skeleton } from "./Skeleton";

export const PageSkeleton = () => {
    return (
        <div style={{ padding: "20px" }}>
            <Skeleton height="32px" width="40%" />
            <Skeleton height="16px" width="60%" style={{ marginTop: "12px" }} />

            <div style={{ marginTop: "30px" }}>
                <Skeleton height="260px" radius="16px" />
            </div>
        </div>
    );
};
