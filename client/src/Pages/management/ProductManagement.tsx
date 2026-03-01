import { useCallback, useEffect, useRef, useState, type FormEvent } from "react"
import { DashboardLayout } from "../../components"
import { validateData } from "../../utils/validateFields"
import { useParams } from "react-router-dom"
import { useGetProductQuery, useUpdateProductMutation, useUploadProductImagesMutation } from "../../store/api/productAPI"
import { InitialProductFormData } from "../../utils/InitialFormData"
import { handleChangeHOC } from "../../utils/handleInputChange"
import { createTypedInput } from "../../components/forms/InputBox"
import { imageHandler } from "../../utils/imageHandler"
import TextArea from "../../components/forms/TextArea"
import SelectCategory from "./SelectCategory"
import toast from "react-hot-toast"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { ApiResponse } from "../../types/api.type"
import { updateProductDataSchema, type UpdateProductFormData } from "../../validations/productDataSchema"


const InputBox = createTypedInput<UpdateProductFormData>()

const ProductManagement = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [imagePrev, setImagePrev] = useState<string>("")
    const ref = useRef<HTMLInputElement>(null)

    const params = useParams();
    const productId = params.id;
    // const [productData, setProductData] = useState<UpdateProductFormData>(InitialProductFormData)

    const [formData, setFormData] = useState<UpdateProductFormData>(InitialProductFormData)
    const { isError, isFetching, isLoading, data } = useGetProductQuery(productId!)
    const updateProductAPI = useUpdateProductMutation()[0]
    const uploadImages = useUploadProductImagesMutation()[0];


    const { onInput, handleInputChange } = handleChangeHOC<UpdateProductFormData>(setFormData)

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")

        // const payload = {
        //     ...formData,
        //     stock: Number(formData.stock),
        //     price: Number(formData.price)
        // }

        // console.log(payload)

        // const result = validateData(updateProductDataSchema, payload)
        // if (!result.success) {
        //     const message = result.message ?? "Something went wrong"
        //     toast.error(message)
        //     setError(message)
        //     return;
        // }

        try {
            const id = productId!
            if (!id) {
                const message = "ID is missing"
                setError(message);
                toast.error(message)
                return;
            }

            // const res = await updateProductAPI({ ...formData, id })
            if (!formData.image) {
                setError("Image is required")
                return;
            }
            const res = await uploadImages({
                id,
                images: [formData.image]
            })

            if (res.error) {
                const err = res.error as FetchBaseQueryError
                const message = (err.data as ApiResponse)?.message
                throw new Error(message)
            }

        } catch (error: any) {

            let errMessage =
                error?.data?.message
                || error.message
                || "Something went wrong"

            toast.error(errMessage)
            setError(errMessage)

            console.error("Sync error:", error)
        } finally {
            // setFormData(InitialProductFormData)
            setLoading(false)
        }


        // const res = await updateProductAPI({ _id: productId!, ...result.data! })
        // console.log(res)
    }

    useEffect(() => {
        console.log("It's working")
        if (!formData.image) return;
        console.log(formData.image)
        imageHandler(formData.image!, (base) => setImagePrev(base))
    }, [formData.image])

    if (isError) {
        return <div>Something went wrong</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isFetching) {
        return <div>Loading...</div>
    }
    console.log(data?.data.images)
    return (
        <DashboardLayout>
            <main className="management">
                <section>
                    <strong>Id {data?.data?._id}</strong>
                    <img src={
                        imagePrev ||
                        data?.data.images[0] || ""

                    }
                        alt="New Image"
                        loading="lazy"
                    />


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
                        />

                        <InputBox
                            label="Price"
                            name="price"
                            type="number"
                            min={0}
                            value={String(formData.price)}
                            placeholder="Enter product price"
                            onChange={onInput("price")}
                        />

                        <InputBox
                            label="Stock"
                            name="stock"
                            type="number"
                            min={0}
                            value={String(formData.stock)}
                            placeholder="Enter product stock"
                            onChange={onInput("stock")}
                        />
                        <InputBox
                            name="brand"
                            type="text"
                            label="Brand"
                            placeholder="Enter product brand"
                            value={formData.brand}
                            onChange={onInput("brand")}
                        />

                        {/* CATEGORY */}
                        <SelectCategory
                            value={formData.category ?? ""}
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
                                value={formData.image}
                                onChange={(e) => handleInputChange("image", e.target.files?.[0])}
                                label="Image"
                                imgPrev={imagePrev}
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