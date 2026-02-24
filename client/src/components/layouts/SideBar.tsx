// import { RiDashboardFill } from "react-icons/ri"
import { Link, useLocation, type Location } from "react-router-dom"
import { ADMIN_SIDEBAR_DATA } from "../../utils/data"
import type { IconType } from "react-icons";
import { MdOutlineClose } from "react-icons/md";
import type { ReactNode } from "react";
import { useAppDispatch } from "../../store/hooks";
import { clearUser } from "../../store/reducers/authSlice";

const AdminSideBar = ({ isOpen, onClose }: { isOpen: boolean, onClose: Function }) => {
    const location = useLocation();
    return (
        <aside style={{
            left: isOpen ? "0%" : "-100%"
        }}>
            <div className="sidebar-btn--container">
                <button
                    className="sidebar-btn"
                    onClick={() => onClose()}
                >
                    <MdOutlineClose />
                </button>
            </div>

            <h2>Logo.</h2>
            <DashboardSideBar location={location} />
            <ChartsSideBar location={location} />
            <AppSideBar location={location} />
        </aside >
    )
}

const DashboardSideBar = ({ location }: { location: Location }) => (
    <div>
        <h5>Dashboard</h5>
        <ul>
            {ADMIN_SIDEBAR_DATA.DASHBOARD.map(({ label, url, Icon }) => (
                <Li
                    key={url}
                    url={url}
                    label={label}
                    Icon={Icon}
                    location={location}
                />
            ))}
        </ul>
    </div>
)

const ChartsSideBar = ({ location }: { location: Location }) => (
    <div>
        <h5>Charts</h5>
        <ul>
            {ADMIN_SIDEBAR_DATA.CHARTS.map(({ label, url, Icon }) => (
                <Li
                    key={url}
                    url={url}
                    label={label}
                    location={location}
                    Icon={Icon}
                />
            ))}
        </ul>
    </div>
)

const AppSideBar = ({ location }: { location: Location }) => (
    <div>
        <h5>Apps</h5>
        <ul>
            {ADMIN_SIDEBAR_DATA.APP.map(({ label, url, Icon }) => (
                <Li
                    key={url}
                    url={url}
                    label={label}
                    location={location}
                    Icon={Icon}
                />
            ))}
        </ul>
    </div>
)

interface LiProps {
    url: string,
    label: string | ReactNode,
    location: Location,
    Icon: IconType
}
const Li = ({ url, label, location, Icon }: LiProps) => {

    const dispatch = useAppDispatch()
    const handleClick = () => {
        if (url === "/logout") {
            dispatch(clearUser())
        }
    }
    return <li
        onClick={handleClick}

        style={{
            backgroundColor: location.pathname
                .includes(url)
                ? "var(--sidebar-primary)" : "var(--sidebar-accent)",
            color: location.pathname.includes(url) ? "var(--sidebar-primary-foreground)" : "var(--sidebar-accent-foreground)"
        }}
    >
        <Link style={{
            color: location.pathname.includes(url) ? "var(--sidebar-primary-foreground" : "var(--sidebar-accent-foreground)"
        }}
            to={url}
        >
            <Icon />
            {label}
        </Link>
    </li >
}
export default AdminSideBar

