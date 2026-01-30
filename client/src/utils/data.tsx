import type { ReactNode } from "react";
import type { IconType } from "react-icons"
import { AiFillFileText } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri"
import LogoutBtn from '../components/LogoutBtn'
// import type { Location } from "react-router-dom"

type AdminSideBarItem =
    {
        url: string,
        label: string | ReactNode,
        Icon: IconType,
    }

type AdminSideBarData = {
    [key: string]: AdminSideBarItem[];
}

export const ADMIN_SIDEBAR_DATA: AdminSideBarData = {
    DASHBOARD: [
        {
            url: "/admin/dashboard",
            label: "Dashboard",
            Icon: RiDashboardFill,
        },
        {
            url: "/admin/products",
            Icon: RiShoppingBag3Fill,
            label: "Products",
        },
        {
            url: "/admin/transaction",
            Icon: AiFillFileText,
            label: "Transaction"
        },
        {
            url: "/admin/customers",
            Icon: IoIosPeople,
            label: "Customer"
        },

    ],
    CHARTS: [
        {
            url: "/admin/charts/bar",
            label: "Bar",
            Icon: FaChartBar,
        },
        {
            url: "/admin/charts/pie",
            Icon: FaChartPie,
            label: "Pie",
        },
        {
            url: "/admin/charts/line",
            Icon: FaChartLine,
            label: "Line"
        },
    ],
    APP: [
        {
            url: "/admin/apps/stopwatch",
            label: "Stop Watch",
            Icon: FaStopwatch,
        },
        {
            url: "/admin/apps/coupon",
            label: "Coupon",
            Icon: RiCoupon3Fill,
        },
        {
            url: "/admin/apps/toss",
            label: "Toss",
            Icon: FaGamepad,
        },
        {
            url: "/login",
            label: <LogoutBtn />,
            Icon: BiLogOut
        }
    ]
}

