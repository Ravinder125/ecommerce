import type { ReactNode } from "react"
import AdminSideBar from "./SideBar"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="dashboard-layout">
            <AdminSideBar />
            <div>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout