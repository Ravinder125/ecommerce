type PaginationProps = {
    limit?: string,
    page?: string,
}

export const pagination = (query?: PaginationProps) => {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit || 10)
    const skip = (page - 1) * limit

    return { page, limit, skip }
}