import type { PaginationProps } from "../types/pagination.type"

export const Pagination = (
    {
        page,
        totalPages,
        onPageChange,
        limit,
        onLimitChange
    }: PaginationProps) => {
    return <div className="pagination">
        <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
        >
            Prev
        </button>
        <span>{page} of {totalPages}</span>
        <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
        >
            Next
        </button>
    </div>
}