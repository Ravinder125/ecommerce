import { useRef, useState, type FormEvent, } from "react"
import { DashboardLayout } from "../../components"
import { MdOutlineFileUpload } from "react-icons/md"
import { validateData } from "../../utils/validateFields"
import { imageSchema, productDataSchema } from "../../validations/productDataSchema"
import { handleChangeHOC } from "../../utils/handleInputChange"
import { useCreateProductMutation, useProductCategoriesQuery } from "../../store/api/productApi"
import { createTypedInput } from "../../components/forms/InputBox"
import type { NewProductFormData } from "../../types/product.type"
import toast from "react-hot-toast"


const ProductInitialFormData = {
    name: "",
    price: 0,
    stock: 0,
    image: "",
    category: "",
    brand: ""
} as NewProductFormData

const InputBox = createTypedInput<NewProductFormData>()

const NewProduct = () => {
    const [error, setError] = useState<string>("")
    const ref = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState<NewProductFormData>(ProductInitialFormData)

    const {
        isError,
        data: categories,
        isFetching,
        isLoading,
        error: dataError } = useProductCategoriesQuery()
    const newProductApi = useCreateProductMutation()[0];

    const { onInput } = handleChangeHOC(setFormData)

    const changeImageHandler = () => {
        setError("")
        const file: File | undefined = ref.current?.files?.[0]
        const result = validateData(imageSchema, { image: file })

        if (!result.success) {
            console.log(result.message)
            setError(result.message!)
            return;
        }
        const reader: FileReader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setFormData(prev => ({ ...prev, image: reader.result }))
                }
            }
        }
    }
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")

        // const payload: FormData = {
        //     name: formData.name,
        //     price: formData.price,
        //     stock: formData.stock,
        //     image: formData.image,
        //     category: formData.category
        // }
        const result = validateData(productDataSchema, formData)
        if (!result.success) {
            console.log(formData)
            setError(result.message!)
            return;
        }
        try {
            const res = await newProductApi(result.data!)
            console.log(res)
            if (res.data?.success) {
                toast.success(res.data.message!)
                return
            }

            if (!res.data?.success) {
                throw new Error(res.data?.message)
            }

        } catch (error: any) {
            toast.error(error.message)
            console.log("Error while creating the product", error)
        }

    }

    if (isError) {
        console.log(dataError)
        return <div>Something went wrong</div>
    }

    if (isFetching) {
        return <div>Loading...</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <DashboardLayout>
            <section className="management">
                <article>
                    <form onSubmit={submitHandler}>
                        <h2>Sunny the Financer</h2>

                        <InputBox
                            name="name"
                            label="Name"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={onInput("name")}
                            required
                        />

                        <InputBox
                            name="brand"
                            type="text"
                            label="Brand"
                            placeholder="Enter product brand"
                            value={formData.brand}
                            onChange={onInput("brand")}
                            required
                        />

                        <InputBox
                            name="price"
                            type="number"
                            label="Price"
                            placeholder="Enter product price"
                            value={String(formData.price)}
                            onChange={onInput("price")}
                            required
                        />

                        <InputBox
                            name="stock"
                            type="number"
                            label="Stock"
                            placeholder="Enter product stock"
                            value={String(formData.stock)}
                            onChange={onInput("stock")}

                            required
                        />


                        {/* CATEGORY */}
                        <div className="input-box">
                            <label>Category</label>
                            <select
                                // name="category"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        category: e.target.value
                                    }))
                                }
                                required
                            >
                                <option value="">None</option>
                                {categories?.data.map(c => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* IMAGE UPLOAD */}
                        <div
                            id="file-upload"
                            className="input-box"
                        >
                            <MdOutlineFileUpload />
                            <label style={{ cursor: "pointer" }} htmlFor="image">
                                Choose Image
                            </label>

                            <input
                                ref={ref}
                                onChange={changeImageHandler}
                                type="file"
                                hidden
                                // required
                                name="image"
                                id="image"
                                style={{ display: "none" }}
                            />
                        </div>

                        {/* PREVIEW */}
                        {formData.image && (
                            <div className="image-preview">
                                <img
                                    src={
                                        typeof formData.image === "string"
                                            ? formData.image
                                            : ""
                                    }
                                    alt="New product"
                                />
                            </div>
                        )}

                        {error && <div className="error-msg">{error}</div>}

                        <button type="submit" className="submit-btn">
                            {isLoading ? "Loading..." : "Create New"}

                        </button>
                    </form>
                </article>
            </section>
        </DashboardLayout >
    )
}

export default NewProduct

