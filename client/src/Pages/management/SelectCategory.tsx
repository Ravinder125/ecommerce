import { useProductCategoriesQuery } from "../../store/api/productAPI"

type SelectCategoryProps = {
    value: string;
    className?: string;
    required?: boolean;
    onChange: (value: string) => void
}

const SelectCategory = ({ value, className = "", onChange }: SelectCategoryProps) => {
    const {
        isError,
        data,
        isFetching,
        isLoading,
    } = useProductCategoriesQuery()

    if (isError) {
        <div>Something went wrong</div>
    }

    if (isLoading) {
        <div>Loading...</div>
    }
    if (isFetching) {
        <div>Loading...</div>
    }
    return (
        <div className={`input-box ${className}`}>
            <label htmlFor="category">Category</label>
            <select
                // name="category"
                value={value}
                required
                name="category"
                id="category"
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">None</option>
                {data?.data.map(c => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectCategory