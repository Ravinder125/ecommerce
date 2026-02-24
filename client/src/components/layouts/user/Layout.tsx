import type { ReactNode } from "react"
import Header from "../Header"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="layout">
            <Header />
            <main className="layout-content">
                {children}
            </main>
        </div>
    )
}

export default Layout;
