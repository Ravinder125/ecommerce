import { useContext, createContext, type ReactNode, useState, useEffect } from 'react';
type Theme = "dark" | "light";

type ContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const themeContext = createContext<ContextType>({
    theme: "light",
    toggleTheme: () => { }
});

const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light";
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) return storedTheme;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    const toggleTheme = () => {
        const themeMode: Theme = theme === "dark" ? "light" : "dark";
        setTheme(themeMode);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        if (storedTheme) {
            document.documentElement.setAttribute("data-theme", storedTheme);
            setTheme(storedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
            const systemTheme: Theme = prefersDark ? "dark" : "light";
            setTheme(systemTheme);
            document.documentElement.setAttribute("data-theme", systemTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <themeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </themeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(themeContext);
};