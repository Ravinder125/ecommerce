import type { ColumnDef } from '@tanstack/react-table';
import TableHOC from './TableHOC'


interface DataType {
    id: string,
    quantity: number,
    discount: number,
    amount: number,
    status: string,
}

const columns: ColumnDef<DataType>[] = [
    {
        header: "Id",
        accessorKey: "id",
    },
    {
        header: "Discount",
        accessorKey: "discount",
    },
    {
        header: "Amount",
        accessorKey: "amount",
    },
    {
        header: "Status",
        accessorKey: "status",
    },
]


const DashboardTable = ({ data = [] }: { data: DataType[] }) => {
    return TableHOC<DataType>(columns, data, "transaction-box", "Top Transaction")()

}

export default DashboardTable