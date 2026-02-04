import type React from "react";

export const handleChangeHOC = <T>(
    setData: React.Dispatch<React.SetStateAction<T>>
) => {
    return {
        handleInputChange<K extends keyof T>(key: K, value: T[K]): void {
            setData(prev => ({
                ...prev,
                [key]: value,
            }));
        },

        onInput:
            <K extends keyof T>(key: K) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setData(prev => ({
                    ...prev,
                    [key]: e.target.value as T[K],
                }));
            },
    };
};
