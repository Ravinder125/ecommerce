import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    type ColumnDef,
} from "@tanstack/react-table";

import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function TableHOC<T extends object>(
    columns: ColumnDef<T, any>[],
    data: T[],
    containerClassName: string,
    heading: string,
    showPageNum = 7
) {
    const table = useReactTable<T>({
        data,
        columns,
        initialState: {
            pagination: {
                pageSize: 8,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });


    return function HOC() {
        return (
            <div className={containerClassName}>
                <h2 className="heading">{heading}</h2>

                <table className="table">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === "asc" && <AiOutlineSortAscending />}
                                        {header.column.getIsSorted() === "desc" && <AiOutlineSortDescending />}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {table.getPageCount() >= showPageNum && (
                    <div className="table-pagination">
                        {table.getPageCount() > 2 && (
                            <button disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
                                First
                            </button>
                        )}

                        <button
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                        >
                            <GrFormPrevious />
                        </button>

                        <span>
                            {table.getState().pagination.pageIndex + 1} of page {table.getPageCount()}
                        </span>

                        <button
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                        >
                            <GrFormNext />
                        </button>

                        {table.getPageCount() > 2 && (
                            <button
                                disabled={!table.getCanNextPage()}
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            >
                                Last
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };
}

export default TableHOC;
