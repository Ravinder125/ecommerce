import { useRef, useState, type FormEvent, } from "react"
import { DashboardLayout } from "../../components"
import { validateData } from "../../utils/validateFields"
import { productDataSchema } from "../../validations/productDataSchema"
import { handleChangeHOC } from "../../utils/handleInputChange"
import { useCreateProductMutation, useProductCategoriesQuery } from "../../store/api/productApi"
import { createTypedInput } from "../../components/forms/InputBox"
import type { NewProductFormData } from "../../types/product.type"
import toast from "react-hot-toast"
import { imageHandler } from "../../utils/imageHandler"
import TextArea from "../../components/forms/TextArea"
import { InitialProductFormData } from "../../utils/InitialFormData"
import SelectCategory from "./SelectCategory"



const InputBox = createTypedInput<NewProductFormData>()

const NewProduct = () => {
    const [error, setError] = useState<string>("")
    const ref = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState<NewProductFormData>(InitialProductFormData)

    const {
        isError,
        data: categories,
        isFetching,
        isLoading,
        error: dataError } = useProductCategoriesQuery()
    const newProductApi = useCreateProductMutation()[0];

    const { onInput, handleInputChange } = handleChangeHOC(setFormData)

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        const payload = {
            ...formData,
            stock: Number(formData.stock),
            price: Number(formData.price)
        }

        const result = validateData(productDataSchema, payload)
        if (!result.success) {
            console.log(result)
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
                        <h2>New Product</h2>

                        <div className="management-form">
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
                            <SelectCategory
                            value={formData.category}
                            onChange={(value) => handleInputChange("category", value)}
                        />
                            <div style={{
                                // margin: "1rem auto",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                // justifyContent: "center"
                            }}>

                                <InputBox
                                    name="image"
                                    type="file"
                                    inputRef={ref}
                                    value={typeof formData.image === "string"
                                        ? formData.image : undefined
                                    }
                                    onChange={(e) =>
                                        imageHandler(
                                            e.target.files?.[0]!,
                                            (base: string) => handleInputChange("image", base))}
                                    label="Image"
                                    action={() => ref.current?.click()}
                                />
                            </div>

                            <TextArea
                                style={{ gridColumnStart: "1", gridColumnEnd: "3" }}
                                onChange={(e) => setFormData(prev =>
                                    ({ ...prev, description: e.target.value }))}
                                placeholder="Description..."
                                name="description"
                                id="description"
                            />

                        </div>

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

