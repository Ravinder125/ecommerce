import { useState, type ReactElement } from "react";
import { DashboardLayout } from "../components"
import { TableHOC } from "../components"
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import type { ColumnDef } from "@tanstack/react-table";

interface DataType {
  avatar: ReactElement;
  name: string,
  email: string,
  gender: string,
  action: ReactElement,
}

const columns: ColumnDef<DataType>[] = [
  {
    header: "Avatar",
    accessorKey: "avatar"
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
  },
]


const arr: DataType[] = [
  {
    avatar: <img src="https://i.pravatar.cc/40?img=1" alt="Avatar" />,
    name: "Ravi Kumar",
    email: "1234567890",
    gender: "Male",
    action: <Link to="/edit/1">Edit</Link>,
  },
  {
    avatar: <img src="https://i.pravatar.cc/40?img=2" alt="Avatar" />,
    name: "Anjali Sharma",
    email: "9876543210",
    gender: "Female",
    action: <Link to="/edit/2">Edit</Link>,
  },
  {
    avatar: <img src="https://i.pravatar.cc/40?img=3" alt="Avatar" />,
    name: "Suresh Mehta",
    email: "1122334455",
    gender: "Male",
    action: <Link to="/edit/3">Edit</Link>,
  },
  {
    avatar: <img src="https://i.pravatar.cc/40?img=4" alt="Avatar" />,
    name: "Neha Verma",
    email: "9988776655",
    gender: "Female",
    action: <Link to="/edit/4">Edit</Link>,
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