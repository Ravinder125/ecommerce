import { useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { DashboardLayout } from "../../../components"
import { ImageSelector } from "../../../components/forms/ImageSelector"
import { createTypedInput } from "../../../components/forms/InputBox"
import TextArea from "../../../components/forms/TextArea"
import { useCreateProductMutation, useUploadProductImagesMutation } from "../../../store/api/productAPI"
import { handleChangeHOC } from "../../../utils/handleInputChange"
import { InitialProductFormData } from "../../../utils/InitialFormData"
import { ReduxResponseHandle } from "../../../utils/ReduxResponseHandle"
import { validateData } from "../../../utils/validateFields"
import { productDataSchema, type NewProductFormData } from "../../../validations/productDataSchema"
import SelectCategory from "./SelectCategory"
import { useNavigate } from "react-router-dom"



const InputBox = createTypedInput<NewProductFormData>()

const NewProduct = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<NewProductFormData>(InitialProductFormData)

    const navigate = useNavigate();
    const newProductApi = useCreateProductMutation()[0];
    const uploadImages = useUploadProductImagesMutation()[0];

    const { onInput, handleInputChange } = handleChangeHOC(setFormData)

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        console.log("working")
        e.preventDefault();
        setError("")
        const payload = {
            ...formData,
            stock: Number(formData.stock),
            price: Number(formData.price)
        }

        try {
            const result = validateData(productDataSchema, payload)
            if (!result.success) {
                throw new Error(result.message)
            }

            setLoading(true)
            const res = await newProductApi(result.data!)
            const postRes = ReduxResponseHandle(res, null, "", true)
            const res2 = await uploadImages({
                id: postRes!._id,
                images: formData.images
            })
            ReduxResponseHandle(res2, navigate, "/admin/products")

        } catch (error: any) {
            let errMessage: string =
                error?.data?.message
                || error.message
                || "Something went wrong"

            toast.error(errMessage)
            setError(errMessage)
            // console.error("Sync error:", error)
        } finally {
            setFormData(InitialProductFormData)
            setLoading(false)
        }

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
                                required={true}
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
                                <ImageSelector
                                    name="images"
                                    existingImages={[]}
                                    onChange={(e) => handleInputChange("images", e)}
                                    value={formData.images}
                                    label="Images"
                                    multiple={true}
                                    required={true}
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

                        <button disabled={loading} type="submit" className="submit-btn">
                            {(loading) ? "Loading..." : "Create New"}

                        </button>
                    </form>
                </article>
            </section>
        </DashboardLayout >
    )
}

export default NewProduct

