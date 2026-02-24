export type Limit = 10 | 15 | 20

export type PaginationProps = {
    page: number,
    totalPages: number,
    limit?: number
    onPageChange: (page: number) => void,
    onLimitChange?: (limit: Limit) => void
}