import type { IconType } from "react-icons"
import { AiFillFileText } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri"
// import type { Location } from "react-router-dom"

type AdminSideBarItem =
    {
        url: string,
        label: string,
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
            url: "/admin/app/stopwatch",
            label: "Stop Watch",
            Icon: FaStopwatch,
        },
        {
            url: "/admin/app/coupon",
            label: "Coupon",
            Icon: RiCoupon3Fill,
        },
        {
            url: "/admin/app/toss",
            label: "Toss",
            Icon: FaGamepad,
        },
    ]
}

