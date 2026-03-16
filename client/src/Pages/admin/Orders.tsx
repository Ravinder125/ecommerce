import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, TableHOC } from "../../components";
import { useOrdersQuery, type TableOrder } from "../../store/api/transactionAPI";

const column: ColumnDef<TableOrder>[] = [
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
        accessorKey: "total"
    },
    {
        header: "Status",
        accessorKey: "orderStatus",
        cell: ({ row }) => {
            const status = row.original.orderStatus;
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
    const { isError, data, isLoading } = useOrdersQuery();
    const [rows, setRows] = useState<TableOrder[]>([])
    const Table = TableHOC<TableOrder>(
        column, rows, "dashboard-product-box",
        "Orders", 5
    )

    useEffect(() => {
        if (data?.data) {
            setRows(data.data)
        }
    }, [data, isLoading])

    if (isError) return <div>Something went wrong.</div>
    if (isLoading) return <div>Loading...</div>

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