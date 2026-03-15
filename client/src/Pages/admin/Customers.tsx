import { DashboardLayout } from "../../components"
import { TableHOC } from "../../components"
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import type { ColumnDef } from "@tanstack/react-table";
import { useAllUsersQuery, type Customer } from "../../store/api/syncProfileAPI";
import toast from "react-hot-toast";
import { useState } from "react";
import type { TablePagination } from "../../components/TableHOC";


const columns: ColumnDef<Customer>[] = [
  {
    header: "Avatar",
    accessorKey: "avatar",
    cell: ({ row }) => (
      <img src={row.original?.avatar ?? ""} alt={`${row.original.name} image`} />
    )
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => (
      <Link to={`/customers/edit/${row.original?._id ?? ""}`}>Edit</Link>
    )
  },
]

const Customers = () => {
  const [pagination, setPagination] = useState<TablePagination>({ pageIndex: 0, pageSize: 10 })
  const { isLoading, data, error } = useAllUsersQuery()

  const Table = TableHOC<Customer>(
    columns,
    data?.data!,
    "dashboard-product--box",
    "Customers",
    3,
    setPagination,
    pagination
  );

  if (isLoading) return <div>Loading...</div>
  if (error) {
    toast.error(data?.message ?? "")
    return <div>Something went wrong</div>
  }
  return (
    <DashboardLayout>
      <main>
        {Table()}
        <Link to="/admin/customers/new" className="create-product--btn">
          <FaPlus />
        </Link>
      </main>
    </DashboardLayout>
  )
}

export default Customers