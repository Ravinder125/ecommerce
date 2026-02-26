import { useRef, useState, type FormEvent } from "react"
import { DashboardLayout } from "../../components"
import { validateData } from "../../utils/validateFields"
import { productDataSchema } from "../../validations/productDataSchema"
import { useParams } from "react-router-dom"
import { useGetProductQuery } from "../../store/api/productAPI"
import type { NewProductFormData } from "../../types/product.type"
import { InitialProductFormData } from "../../utils/InitialFormData"
import { handleChangeHOC } from "../../utils/handleInputChange"
import { createTypedInput } from "../../components/forms/InputBox"
import { imageHandler } from "../../utils/imageHandler"
import TextArea from "../../components/forms/TextArea"
import SelectCategory from "./SelectCategory"


const InputBox = createTypedInput<NewProductFormData>()

const ProductManagement = () => {
    const [error, setError] = useState<string>("")
    const ref = useRef<HTMLInputElement>(null)

    const params = useParams();
    const productId = params.id;

    // const [productData, setProductData] = useState<NewProductFormData>(InitialProductFormData)

    const [formData, setFormData] = useState<NewProductFormData>(InitialProductFormData)

    const { isError, isFetching, isLoading, data } = useGetProductQuery(productId!)


    const { onInput, handleInputChange } = handleChangeHOC<NewProductFormData>(setFormData)

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = validateData(productDataSchema, formData)
        if (!result.success) {
            setError(result.message!)
            return;
        }
    }

    if (isError) {
        return <div>Something went wrong</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isFetching) {
        return <div>Loading...</div>
    }

    return (
        <DashboardLayout>
            <main className="management">
                <section>
                    <strong>Id {data?.data._id}</strong>
                    {formData.image && <img src={
                        typeof data?.data.images?.[0] === "string" ? data.data.images?.[0] : " "}
                        alt="New Image" />
                    }

                    <p>{data?.data.name}</p>
                    {
                        data?.data.stock! > 0
                            ? <span className="green">{data?.data.stock}{" "}Available</span>
                            : <span className="red">Not Available</span>
                    }
                    <h2>{`$${data?.data.price}`}</h2>
                </section>
                <article>
                    <form onSubmit={submitHandler}>
                        <h2>Manage Products</h2>

                        <InputBox
                            label="Name"
                            name="name"
                            value={formData.name}
                            placeholder="Enter product name"
                            onChange={onInput("name")}
                            required
                        />

                        <InputBox
                            label="Price"
                            name="price"
                            type="number"
                            min={0}
                            value={String(formData.price)}
                            placeholder="Enter product price"
                            onChange={onInput("price")}
                            required
                        />

                        <InputBox
                            label="Stock"
                            name="stock"
                            type="number"
                            min={0}
                            value={String(formData.stock)}
                            placeholder="Enter product stock"
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

                        {error && <div className="error-msg">{error}</div>}

                        <button type="submit" className="submit-btn">
                            Update
                        </button>
                    </form>
                </article>
            </main>
        </DashboardLayout >
    )
}

export default ProductManagement