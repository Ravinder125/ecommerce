import { useState } from "react";
import { DashboardLayout } from "../components"
import { TableHOC } from "../components"
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import type { ColumnDef } from "@tanstack/react-table";

interface DataType {
  avatar: string;
  name: string,
  email: string,
  gender: string,
  id: string,
}

const columns: ColumnDef<DataType>[] = [
  {
    header: "Avatar",
    accessorKey: "avatar",
    cell: ({ row }) => (
      <img src={row.original.avatar} alt={`${row.original.name} image`} />
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
      <Link to={`/ customers / edit / ${row.original.id}`}>Edit</Link>
    )
  },
]


const arr: DataType[] = [
  {
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Ravi Kumar",
    email: "1234567890",
    gender: "Male",
    id: "ravi-kumar",
  },
  {
    avatar: "https://i.pravatar.cc/40?img=2",
    name: "Anjali Sharma",
    email: "9876543210",
    gender: "Female",
    id: "ravi-kumar",
  },
  {
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "Suresh Mehta",
    email: "1122334455",
    gender: "Male",
    id: "ravi-kumar",
  },
  {
    avatar: "https://i.pravatar.cc/40?img=4",
    name: "Neha Verma",
    email: "9988776655",
    gender: "Female",
    id: "ravi-kumar",
  },
];

const Customers = () => {
  const [data] = useState<DataType[]>(arr);
  const Table = TableHOC<DataType>(
    columns,
    data,
    "dashboard-product--box",
    "Customers",
  );
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