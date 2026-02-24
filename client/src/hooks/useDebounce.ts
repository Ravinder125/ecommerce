import { useEffect, useState } from "react"

export const useDebounce = <T = string>(value: T, delay?: number) => {
    const [debounce, setDebounce] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounce(value), delay)

        return () => clearTimeout(timer)
    }, [value])

    return debounce
}