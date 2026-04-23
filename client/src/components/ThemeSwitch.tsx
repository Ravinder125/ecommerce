import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { useTheme } from "../context/themeContext"

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div
            className="theme-switch"
            onClick={toggleTheme}
        >
            <div style={{
                right: theme === "dark" ? "50%" : "10px"
            }}
            >
                {theme === "dark"
                    ? <MdOutlineDarkMode />
                    : <MdOutlineLightMode />
                }
            </div>
        </div >
    )
}

export default ThemeSwitch