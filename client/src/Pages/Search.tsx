import { useState } from "react"
import { Layout, ProductCard } from "../components"
import data from '../assets/products.json'

const Search = () => {
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<number>(10000);
    const [category, setCategory] = useState<string>("");
    const [page, setPage] = useState<number>(1)

    const addToCartHandler = (id: string) => { }

    const isPrevPage = page > 1;
    const isNextPage = page < 4;

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
                            <option value="Sample1">Sample1</option>
                            <option value="Sample2">Sample2</option>
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
                        {data.products.map(({ _id, name, price, stock, image }) => (
                            <ProductCard
                                key={_id}
                                _id={_id}
                                name={name}
                                price={price}
                                image={image}
                                stock={stock}
                                handler={() => addToCartHandler(_id)}
                            />
                        ))}
                    </div>

                    <article>
                        <button
                            disabled={!isPrevPage}
                            onClick={() => setPage(prev => prev !== 0 ? --prev : prev)}
                        >
                            Prev
                        </button>
                        <span>{page} of {4}</span>
                        <button
                            disabled={!isNextPage}
                            onClick={() => setPage(prev => prev !== 4 ? ++prev : prev)}
                        >
                            Next
                        </button>
                    </article>
                </main>
            </div>
        </Layout>
    )
}

export default Search