import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { FaUser } from "react-icons/fa6"
import { Link } from "react-router-dom"

const user = {
    _id: "",
    role: "user"
}

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const logoutHandler = () => {
        setIsOpen(false);
    }
    return (
        <header className="header">
            <nav>
                <Link to={"/"} >HOME</Link>
                <Link to={"/search"} >
                    <FaSearch />
                </Link>
                <Link to={"/cart"} >
                    <FaShoppingBag />
                </Link>

                {user?._id
                    ? (
                        <>
                            <button onClick={() => setIsOpen(prev => !prev)}><FaUser /></button>
                            <dialog open={isOpen}>
                                <div>
                                    {user.role === "admin" && (
                                        <Link to="/admin/dashboard">Admin</Link>
                                    )}
                                    <Link to="/orders">Orders</Link>
                                    <button onClick={logoutHandler}><FaSignOutAlt /></button>
                                </div>
                            </dialog>
                        </>
                    ) : (<Link to={"/login"} ><FaSignInAlt /></Link>)}
            </nav>
        </header>
    )
}

export default Header