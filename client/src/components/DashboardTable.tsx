import type { ColumnDef } from '@tanstack/react-table';
import TableHOC from './TableHOC'
import type { ModifiedLatestTransactions } from '../types/dashboard.type';

const columns: ColumnDef<ModifiedLatestTransactions>[] = [
    {
        header: "Id",
        accessorKey: "_id",
    },
    {
        header: "Discount",
        accessorKey: "discount",
    },
    {
        header: "Total",
        accessorKey: "total",
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.original.status as string;
            return <span className={`${status === "pending"
                ? "purple" : status === "cancelled"
                    ? "red" : status === "refunded"
                        ? "yellow" : "green"
                }`}>
                {status}
            </span>
        }
    },
]


const DashboardTable = ({ data = [] }: { data: ModifiedLatestTransactions[] }) => {
    return TableHOC<ModifiedLatestTransactions>(columns, data, "transaction-box", "Top Transaction")()

}

export default DashboardTable