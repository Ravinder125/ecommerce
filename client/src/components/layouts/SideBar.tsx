// import { RiDashboardFill } from "react-icons/ri"
import { Link, useLocation, type Location } from "react-router-dom"
import { ADMIN_SIDEBAR_DATA } from "../../utils/data"
import type { IconType } from "react-icons";

const AdminSideBar = () => {
    const location = useLocation();
    return (
        <aside>
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
                    key={label}
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
                    key={label}
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
                    key={label}
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
    label: string,
    location: Location,
    Icon: IconType
}
const Li = ({ url, label, location, Icon }: LiProps) => (
    <li
        style={{
            backgroundColor: location.pathname
                .includes(url)
                ? "rgba(0,115, 255,0.1)" : "white",
            color: location.pathname.includes(url) ? "rgba(0,115, 255,1)" : "black"
        }}
    >
        <Link style={{
            color: location.pathname.includes(url) ? "rgba(0,115, 255,1)" : "black"
        }}
            to={url}>
            <Icon />
            {label}
        </Link>
    </li >
)

export default AdminSideBar

