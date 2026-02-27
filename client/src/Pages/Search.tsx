import { useState } from "react"
import { Layout, ProductCard } from "../components"
import preData from '../assets/products.json'
import { useAppDispatch } from "../store/hooks";
import { addToCart, type CartItem } from "../store/reducers/cartSlice";
import { useAllProductsQuery } from "../store/api/productAPI";
import { useDebounce } from "../hooks/useDebounce";
import type { Limit } from "../types/pagination.type";
import { Pagination } from "../components/Pagination";


const Search = () => {
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("asc");
    const [maxPrice, setMaxPrice] = useState<number>(10000);
    const [category, setCategory] = useState<string>("");
    const [page, setPage] = useState<number>(1)
    // const [totalPages, setTotalPages] = useState<number>(1)
    const [limit, setLimit] = useState<Limit>(10)

    const dispatch = useAppDispatch()

    const addToCartHandler = (product: CartItem) => {
        dispatch(addToCart(product))
    }

    // const isPrevPage = page > 1;
    // const isNextPage = page < 4;
    const debounceSearch = useDebounce(search, 800);
    const debounceMaxPrice = useDebounce(maxPrice, 800);

    const { data, isLoading, isFetching, isError, error } = useAllProductsQuery({
        page,
        search: debounceSearch,
        sort,
        category,
        maxPrice: debounceMaxPrice,
        limit
    })
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        console.log(error)
        return <div>{"Something went wrong"}</div>
    }


    const totalPages = Number(data?.data.totalPages!) || 1;
    const categories = data?.data.categories ?? [];

    return (
        <Layout>
            <div className="product-search--page">
                <aside>
                    <h2>Filters</h2>
                    <div>
                        <h4>Sort1</h4>
                        <select value={sort} onChange={({ target }) => setSort(target.value)}>
                            <option value="">None</option>
                            <option value="asc">Price (Low to High)</option>
                            <option value="dsc">Price (High to Low)</option>
                        </select>
                    </div>
                    <div>
                        <h4>Max Price {maxPrice || ""}</h4>
                        <input
                            type="range"
                            value={maxPrice}
                            min={100}
                            max={100000}
                            onChange={({ target }) => setMaxPrice(Number(target.value))}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <div>
                        <h4>Category</h4>
                        <select value={category} onChange={({ target }) => setCategory(target.value)}>
                            <option value="">All</option>
                            {categories.map((c) =>
                                <option value={c}>{c}</option>
                            )}
                            {/* <option value="Sample2">Sample2</option> */}
                        </select>
                    </div>
                </aside>
                <main>
                    <h1>Products</h1>
                    <input
                        type="text"
                        value={search}
                        onChange={({ target }) => setSearch(target.value)}
                        placeholder="Search by name..."
                    />

                    <div className="search-product--list">
                        {isFetching ? <div>Loading...</div>
                            : (
                                data?.data.products.map((p) => {
                                    const { _id, name, price, stock, images } = p
                                    return <ProductCard
                                        key={_id}
                                        _id={_id}
                                        name={name}
                                        price={price}
                                        image={images[0] ?? preData.products[0].image}
                                        stock={stock}
                                        handler={() => addToCartHandler({
                                            productId: _id,
                                            image: preData.products[0].image,
                                            price,
                                            name,
                                            stock
                                        })}
                                    />
                                }
                                )
                            )}
                    </div>

                    <div style={{ padding: "1rem" }}>
                        <Pagination
                            page={page}
                            onPageChange={(page) => setPage(page)}
                            totalPages={totalPages}
                            onLimitChange={((limit: Limit) => setLimit(limit))}
                        />
                    </div>
                    {/* <article>
                        <button
                            disabled={!isPrevPage}
                            onClick={() => setPage(prev => prev !== 0 ? --prev : prev)}
                        >
                            Prev
                        </button>
                        <span>{page} of {totalPages}</span>
                        <button
                            disabled={!isNextPage}
                            onClick={() => setPage(prev => prev !== Number(data?.data.totalPages) ? ++prev : prev)}
                        >
                            Next
                        </button>
                    </article> */}
                </main>
            </div>
        </Layout>
    )
}

export default Search

