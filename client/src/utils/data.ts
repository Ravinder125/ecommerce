import type { IconType } from "react-icons"
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri"
// import type { Location } from "react-router-dom"

type AdminSideBarItem =
    {
        url: string,
        label: string,
        Icon: IconType,
    }

type AdminSideBarData = AdminSideBarItem[];

export const ADMIN_SIDEBAR_DATA: AdminSideBarData = [
    {
        url: "/admin/dashboard",
        label: "Dashboard",
        Icon: RiDashboardFill,
    },
    {
        url: "/admin/products v ",
        Icon: RiShoppingBag3Fill,
        label: "Products",
    },
    {
        url: "/admin/transaction",
        Icon: AiFillFileText,
        label: "Transaction"
    },
    {
        url: "/admin/customer",
        Icon: IoIosPeople,
        label: "Customer"
    },

]