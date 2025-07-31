import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, TableHOC } from "../components";


type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: string;
}

const data: DataType[] = [
    { _id: "1jadjflkjsaldjflsjadlfs", amount: 4500, quantity: 2, discount: 10, status: "paid" },
    { _id: "2jadjflkjsaldjflsjadlfs", amount: 3200, quantity: 1, discount: 5, status: "pending" },
    { _id: "3jadjflkjsaldjflsjadlfs", amount: 7800, quantity: 3, discount: 15, status: "cancelled" },
    { _id: "4jadjflkjsaldjflsjadlfs", amount: 5000, quantity: 2, discount: 0, status: "paid" },
    { _id: "5jadjflkjsaldjflsjadlfs", amount: 6100, quantity: 4, discount: 20, status: "refunded" },
    { _id: "6jadjflkjsaldjflsjadlfs", amount: 3000, quantity: 1, discount: 5, status: "pending" },
    { _id: "7jadjflkjsaldjflsjadlfs", amount: 8700, quantity: 2, discount: 10, status: "paid" },
    { _id: "8jadjflkjsaldjflsjadlfs", amount: 6900, quantity: 5, discount: 25, status: "cancelled" },
    { _id: "9jadjflkjsaldjflsjadlfs", amount: 4100, quantity: 2, discount: 0, status: "paid" },
    { _id: "10jadjflkjsaldjflsjadlfs", amount: 7400, quantity: 3, discount: 12, status: "pending" },
    { _id: "11jadjflkjsaldjflsjadlfs", amount: 5800, quantity: 2, discount: 8, status: "paid" },
    { _id: "12jadjflkjsaldjflsjadlfs", amount: 9500, quantity: 1, discount: 0, status: "cancelled" },
    { _id: "13jadjflkjsaldjflsjadlfs", amount: 6200, quantity: 4, discount: 20, status: "refunded" },
    { _id: "14jadjflkjsaldjflsjadlfs", amount: 8300, quantity: 2, discount: 5, status: "paid" },
    { _id: "15jadjflkjsaldjflsjadlfs", amount: 7100, quantity: 3, discount: 15, status: "pending" },
    { _id: "16jadjflkjsaldjflsjadlfs", amount: 4900, quantity: 1, discount: 10, status: "paid" },
    { _id: "17jadjflkjsaldjflsjadlfs", amount: 3000, quantity: 2, discount: 0, status: "refunded" },
    { _id: "18jadjflkjsaldjflsjadlfs", amount: 9200, quantity: 3, discount: 18, status: "cancelled" },
    { _id: "19jadjflkjsaldjflsjadlfs", amount: 4500, quantity: 2, discount: 5, status: "pending" },
    { _id: "20jadjflkjsaldjflsjadlfs", amount: 7700, quantity: 1, discount: 10, status: "paid" },
    { _id: "21jadjflkjsaldjflsjadlfs", amount: 5300, quantity: 3, discount: 12, status: "refunded" },
    { _id: "22jadjflkjsaldjflsjadlfs", amount: 6400, quantity: 2, discount: 0, status: "paid" },
    { _id: "23jadjflkjsaldjflsjadlfs", amount: 8800, quantity: 4, discount: 15, status: "cancelled" },
    { _id: "24jadjflkjsaldjflsjadlfs", amount: 3900, quantity: 2, discount: 8, status: "pending" },
    { _id: "25jadjflkjsaldjflsjadlfs", amount: 4600, quantity: 1, discount: 5, status: "paid" },
    { _id: "26jadjflkjsaldjflsjadlfs", amount: 7300, quantity: 3, discount: 20, status: "refunded" },
    { _id: "27jadjflkjsaldjflsjadlfs", amount: 8100, quantity: 2, discount: 0, status: "paid" },
    { _id: "28jadjflkjsaldjflsjadlfs", amount: 6700, quantity: 4, discount: 18, status: "pending" },
    { _id: "29jadjflkjsaldjflsjadlfs", amount: 9100, quantity: 1, discount: 10, status: "cancelled" },
    { _id: "30jadjflkjsaldjflsjadlfs", amount: 6000, quantity: 3, discount: 12, status: "paid" },
    { _id: "31jadjflkjsaldjflsjadlfs", amount: 7400, quantity: 2, discount: 6, status: "refunded" },
    { _id: "32jadjflkjsaldjflsjadlfs", amount: 5700, quantity: 1, discount: 0, status: "paid" },
    { _id: "33jadjflkjsaldjflsjadlfs", amount: 8200, quantity: 3, discount: 14, status: "cancelled" },
    { _id: "34jadjflkjsaldjflsjadlfs", amount: 4900, quantity: 2, discount: 5, status: "pending" },
    { _id: "35jadjflkjsaldjflsjadlfs", amount: 6500, quantity: 4, discount: 20, status: "paid" },
    { _id: "36jadjflkjsaldjflsjadlfs", amount: 7200, quantity: 1, discount: 10, status: "refunded" },
    { _id: "37jadjflkjsaldjflsjadlfs", amount: 5600, quantity: 2, discount: 7, status: "paid" },
    { _id: "38jadjflkjsaldjflsjadlfs", amount: 8900, quantity: 3, discount: 12, status: "cancelled" },
    { _id: "39jadjflkjsaldjflsjadlfs", amount: 3100, quantity: 2, discount: 3, status: "pending" },
    { _id: "40jadjflkjsaldjflsjadlfs", amount: 6800, quantity: 1, discount: 5, status: "paid" },
];


const column: ColumnDef<DataType>[] = [
    {
        header: "Id",
        accessorKey: "_id"
    },
    {
        header: "Quantity",
        accessorKey: "quantity"
    },
    {
        header: "Discount",
        accessorKey: "discount"
    },
    {
        header: "Amount",
        accessorKey: "amount"
    },
    {
        header: "Status",
        accessorKey: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return <span className={`${status === "pending"
                ? "purple" : status === "cancelled"
                    ? "red" : status === "refunded"
                        ? "yellow" : "green"
                }`}>
                {status}
            </span>
        }
    },
    {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
            <Link to={`/orders/${row.original._id}`}>
                View
            </Link>
        )
    },
]

const Orders = () => {
    const [rows] = useState<DataType[]>(data)
    const Table = TableHOC<DataType>(
        column, rows, "dashboard-product-box",
        "Orders", 5
    )
    return (
        <Layout>
            <div className="container">
                <h1>My Orders</h1>
                {Table()}
            </div>
        </Layout>
    )
}

export default Orders