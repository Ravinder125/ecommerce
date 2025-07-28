import { useState, type ReactNode } from "react"
import AdminSideBar from "./SideBar"
import { GiHamburgerMenu } from "react-icons/gi"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className="dashboard-layout">
            <AdminSideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className="dashboard-container">
                <button
                    className="sidebar-btn"
                    onClick={() => setIsOpen(true)}
                >
                    <GiHamburgerMenu />
                </button>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout