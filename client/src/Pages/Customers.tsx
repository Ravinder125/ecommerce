import { DashboardLayout } from "../components"
import { TableHOC } from "../components"
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import type { ColumnDef } from "@tanstack/react-table";
import { useAllUsersQuery, type Customer } from "../store/api/syncProfileAPI";
import toast from "react-hot-toast";
import { useState } from "react";
import type { TablePagination } from "../components/TableHOC";


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


// const arr: Customer[] = [
//   {
//     avatar: "https://i.pravatar.cc/40?img=1",
//     name: "Ravi Kumar",
//     email: "1234567890",
//     gender: "Male",
//     id: "ravi-kumar",
//   },
//   {
//     avatar: "https://i.pravatar.cc/40?img=2",
//     name: "Anjali Sharma",
//     email: "9876543210",
//     gender: "Female",
//     id: "ravi-kumar",
//   },
//   {
//     avatar: "https://i.pravatar.cc/40?img=3",
//     name: "Suresh Mehta",
//     email: "1122334455",
//     gender: "Male",
//     id: "ravi-kumar",
//   },
//   {
//     avatar: "https://i.pravatar.cc/40?img=4",
//     name: "Neha Verma",
//     email: "9988776655",
//     gender: "Female",
//     id: "ravi-kumar",
//   },
// ];

const Customers = () => {
  // const [data] = useState<DataType[]>(arr);
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