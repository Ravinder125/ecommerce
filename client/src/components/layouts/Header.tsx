import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { FaUser } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { auth } from "../../config/firebase"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { signOut } from 'firebase/auth'
import toast from "react-hot-toast"
import { clearUser } from "../../store/reducers/authSlice"


const Header = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.user)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const logoutHandler = async () => {
        try {
            await signOut(auth)
            toast.success("User successfully logout")
        } catch (error: any) {
            toast.error(error.message || "Logout failed")
        } finally {
            setIsOpen(false);
            dispatch(clearUser())
        }
    }


    return (
        <header className="header">
            <nav>
                <Link to="/" >HOME</Link>
                <Link to="/search" >
                    <FaSearch />
                </Link>
                <Link to="/cart" >
                    <FaShoppingBag />
                </Link>

                {auth?.currentUser
                    ? (
                        <>
                            <button onClick={() => setIsOpen(prev => !prev)}><FaUser /></button>
                            <dialog open={isOpen}>
                                <div>
                                    {user && user.role === "admin" && (
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