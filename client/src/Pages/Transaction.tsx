import { useState, } from "react";
import { DashboardLayout } from "../components"
import { TableHOC } from "../components"
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

interface DataType {
  user: string;
  amount: number,
  discount: number,
  quantity: string,
  status: string,
  id: string,
}

const columns: ColumnDef<DataType>[] = [
  {
    header: "User",
    accessorKey: "user",
  },
  {
    header: "Amount",
    accessorKey: "amount",
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
      const status = row.original.status;
      return <span className={`${status === "Processing" ? "purple" : status === "Shipped" ? "green" : "red"}`}>{status}</span>
    }

  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => (
      <Link to={`admin/transactions/view/${row.original.id}`}>View</Link>
    )
  },
]


const arr: DataType[] = [
  {
    user: "Ravi Kumar",
    amount: 250,
    discount: 10,
    quantity: "2 items",
    status: "Processing",
    id: "ravi-kumar",
  },
  {
    user: "Anjali Sharma",
    amount: 520,
    discount: 15,
    quantity: "5 items",
    status: "Processing",
    id: "ravi-kumar",
  },
  {
    user: "Suresh Mehta",
    amount: 130,
    discount: 5,
    quantity: "1 item",
    status: "Shipped",
    id: "ravi-kumar",
  },
  {
    user: "Neha Verma",
    amount: 340,
    discount: 20,
    quantity: "3 items",
    status: "Cancelled",
    id: "ravi-kumar",
  },
];

const Transaction = () => {
  const [data] = useState<DataType[]>(arr);
  const Table = TableHOC<DataType>(
    columns,
    data,
    "dashboard-product--box",
    "Transaction",
  );
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