import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
    useTable,
    useSortBy,
    usePagination,
    type Column,
    type TableOptions,
    type ColumnInstance,
} from "react-table";

function TableHOC<T extends object>(
    columns: Column<T>[],
    data: T[],
    containerClassName: string,
    heading: string,
    showPageNum = 7,
) {
    const options: TableOptions<T> = {
        columns,
        data,
        initialState: {
            pageSize: 6
        }
    };


    const {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        pageCount,
        gotoPage,
        state: { pageIndex },
        canPreviousPage,
    } = useTable<T>(options, useSortBy, usePagination,);

    return function HOC() {
        return (
            <div className={containerClassName}>
                <h2 className="heading">{heading}</h2>
                <table className="table" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => {
                                    const col = column as ColumnInstance<T>; // ✅ casting to access sort props
                                    return (
                                        <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                                            {col.render("Header")}
                                            {" "}
                                            {col.isSorted ? (col.isSortedDesc ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />) : ""}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {pageCount >= showPageNum && (
                    <div className="table-pagination">
                        {pageCount > 2 && (
                            <>
                                <button disabled={pageIndex === 0}
                                    onClick={() => gotoPage(0)}>
                                    First
                                </button>
                            </>
                        )}
                        <button
                            disabled={!canPreviousPage}
                            onClick={previousPage}>
                            <GrFormPrevious />
                        </button>
                        <span>
                            {pageIndex + 1} of page {pageCount}
                        </span>
                        <button
                            disabled={!canNextPage}
                            onClick={nextPage}>
                            <GrFormNext />
                        </button>

                        {pageCount > 2 && (
                            <>
                                <button
                                    disabled={pageIndex + 1 === pageCount}
                                    onClick={() => gotoPage(pageCount - 1)}>
                                    Last
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        );
    };
}

export default TableHOC;
