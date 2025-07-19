// import { RiDashboardFill } from "react-icons/ri"
import { Link, useLocation, type Location } from "react-router-dom"
import { ADMIN_SIDEBAR_DATA } from "../../utils/data"

const AdminSideBar = () => {
    const location = useLocation();

    return (
        <aside>
            <h2>Logo.</h2>
            <div>
                <h5>Dashboard</h5>
                <ul>
                    {ADMIN_SIDEBAR_DATA.map((item) => (
                        <li
                            style={
                                {
                                    backgroundColor: location.pathname
                                        .includes(item.url)
                                        ? "rgba(0,115, 255,0.1)" : "white"
                                }
                            }
                            key={item.label}>
                            <Link
                                to={item.url}>
                                <item.Icon />
                                {item.label}
                            </Link>
                        </li>
                    ))}

                </ul>
            </div>
        </aside >
    )
}

export default AdminSideBar

