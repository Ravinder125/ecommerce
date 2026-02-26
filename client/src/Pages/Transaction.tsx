import { DashboardLayout } from "../components"
import { TableHOC } from "../components"
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useAdminOrdersQuery } from "../store/api/transactionAPI";
import type { Order } from "../types/transaction.type";



const columns: ColumnDef<Order>[] = [
  {
    header: "User",
    accessorKey: "buyer",
  },
  {
    header: "Amount",
    accessorKey: "totalPrice",
  },
  {
    header: "Discount",
    accessorKey: "discount",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.orderStatus;
      return <span className={`${status === "Processing"
        ? "yellow" : status === "Shipped"
          ? "purple" : status === "Delivered"
            ? "green" : "red"}`}
      >
        {status}
      </span>
    }

  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => (
      <Link to={`/admin/transactions/${row.original._id}`}>View</Link>
    )
  },
]



const Transaction = () => {

  const { data, isLoading, error } = useAdminOrdersQuery()

  const Table = TableHOC<Order>(
    columns,
    data?.data ?? [],
    "dashboard-product--box",
    "Transaction", 3
  )

  if (error) return <div>Something went wrong.</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <DashboardLayout>
      <main>
        {Table()}

        <Link to="/admin/transaction/new" className="create-product--btn">
          <FaPlus />
        </Link>
      </main>
    </DashboardLayout>
  )
}

export default Transaction

