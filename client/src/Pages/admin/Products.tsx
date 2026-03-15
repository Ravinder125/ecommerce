import { useState, } from "react";
import { DashboardLayout } from "../../components"
import { TableHOC } from "../../components"
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useAdminProductsQuery } from "../../store/api/productAPI";
import type { Product } from "../../types/product.type";
import { InputBox } from "../../components/forms/InputBox";
import { useDebounce } from "../../hooks/useDebounce";


const columns: ColumnDef<Product>[] = [
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => (
      <img src={row.original.images?.[0]} alt={`${row.original.name} image`} />
    )
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Stock",
    accessorKey: "stock",
  },
  {
    header: "Brand",
    accessorKey: "brand",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => (
      <Link to={`/admin/products/${row.original._id}`}>Edit</Link>
    )
  },
]

const Products = () => {

  const [search, setSearch] = useState<string>("");
  // const [sort, setSort] = useState<string>("asc");
  // const [maxPrice, setMaxPrice] = useState<number>(10000);
  // const [category, setCategory] = useState<string>("");
  // const [page, setPage] = useState<number>(1)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  const debounceSearch = useDebounce(search, 1000)

  const { error, isLoading, data } = useAdminProductsQuery({
    page: pagination.pageIndex + 1,
    search: debounceSearch?.trim(),
    // sort,
    // category,
    // maxPrice: search,
    // limit
  })

  const Table = TableHOC<Product>(columns, data?.data.products ?? [], "dashboard-product--box",
    "Products", 1,
    setPagination,
    pagination,
    Number(data?.data?.totalPages) ?? 1,
    true
  );

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  return (
    <DashboardLayout>
      <main>
        <div style={{ marginTop: "8rem", padding: "2rem" }}>
          <InputBox
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search"
            placeholder="What are you looking for"
          />
        </div>
        {Table()}

        <Link to="/admin/products/new" className="create-product--btn">
          <FaPlus />
        </Link>
      </main>
    </DashboardLayout>
  )
}

export default Products