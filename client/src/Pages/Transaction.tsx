import { useState, type ReactElement } from "react";
import { DashboardLayout } from "../components"
import { TableHOC } from "../components"
import type { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

interface DataType {
  user: string;
  amount: number,
  discount: number,
  quantity: string,
  action: ReactElement,
  status: ReactElement,
}

const columns: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
]


const arr: DataType[] = [
  {
    user: "Ravi Kumar",
    amount: 250,
    discount: 10,
    quantity: "2 items",
    action: <Link to="/orders/1">View</Link>,
    status: <span style={{ color: "green" }}>Completed</span>,
  },
  {
    user: "Anjali Sharma",
    amount: 520,
    discount: 15,
    quantity: "5 items",
    action: <Link to="/orders/2">View</Link>,
    status: <span style={{ color: "orange" }}>Pending</span>,
  },
  {
    user: "Suresh Mehta",
    amount: 130,
    discount: 5,
    quantity: "1 item",
    action: <Link to="/orders/3">View</Link>,
    status: <span style={{ color: "red" }}>Cancelled</span>,
  },
  {
    user: "Neha Verma",
    amount: 340,
    discount: 20,
    quantity: "3 items",
    action: <Link to="/orders/4">View</Link>,
    status: <span style={{ color: "blue" }}>Processing</span>,
  },
];

const Customers = () => {
  const [data] = useState<DataType[]>(arr);
  const Table = TableHOC<DataType>(
    columns,
    data,
    "dashboard-product--box",
    "Products",
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

export default Customers