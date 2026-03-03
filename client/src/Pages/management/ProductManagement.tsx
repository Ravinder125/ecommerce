import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useEffect, useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { DashboardLayout } from "../../components"
import { createTypedInput } from "../../components/forms/InputBox"
import TextArea from "../../components/forms/TextArea"
import { useGetProductQuery, useUpdateProductMutation, useUploadProductImagesMutation } from "../../store/api/productAPI"
import type { ApiResponse } from "../../types/api.type"
import { InitialProductFormData } from "../../utils/InitialFormData"
import { handleChangeHOC } from "../../utils/handleInputChange"
import { updateProductDataSchema, type UpdateProductFormData } from "../../validations/productDataSchema"
import SelectCategory from "./SelectCategory"
import { validateData } from "../../utils/validateFields"
import { ImageSelector } from "../../components/forms/ImageSelector"
import { useImageHandler } from "../../hooks/useImageHandler"
import { urlToFile } from "../../utils/urlToFile"


const InputBox = createTypedInput<UpdateProductFormData>()

const ProductManagement = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [deleteImages, setDeleteImages] = useState<string[]>([])

    const params = useParams();
    const productId = params.id;

    const [formData, setFormData] = useState<UpdateProductFormData>(InitialProductFormData)
    const [images, setImages] = useState<File[]>([])
    const { isError, isFetching, isLoading, data } = useGetProductQuery(productId!)
    const updateProductAPI = useUpdateProductMutation()[0]
    const uploadImages = useUploadProductImagesMutation()[0];

    const previews = useImageHandler(images)
    const displayImage =
        previews.length > 0
            ? previews[0]
            : data?.data.images?.[0] ?? "";

    const { onInput, handleInputChange } = handleChangeHOC<UpdateProductFormData>(setFormData)

    useEffect(() => {
        if (data?.data?.images) {
            setExistingImages(data.data.images)
        }
    }, [data])

    useEffect(() => {
        if (!data?.data?.images || !(data?.data.images.length === 1)) {
            setImages([])
            return;
        }
        const convertPreviewToFile = async () => {
            const files = await Promise.all(
                data.data.images.map(img => urlToFile(img))
            )

            setImages(files)
        }

        convertPreviewToFile()

    }, [data])




    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")

        const payload = {
            ...formData,
            stock: Number(formData.stock),
            price: Number(formData.price)
        }

        const result = validateData(updateProductDataSchema, payload)
        if (!result.success) {
            const message = result.message ?? "Something went wrong"
            toast.error(message)
            setError(message)
            return;
        }

        try {
            const id = productId!
            if (!id) {
                const message = "ID is missing"
                setError(message);
                toast.error(message)
                return;
            }

            setLoading(true)
            const updateRes = await updateProductAPI({ ...payload, id })
            if (updateRes.error) {
                const err = updateRes.error as FetchBaseQueryError
                const message = (err.data as ApiResponse)?.message
                throw new Error(message)
            }

            if (updateRes.data && images.length >= 0) {
                const uploadRes = await uploadImages({ id, images: images })

                if (!uploadRes.data?.success) {
                    throw new Error("Uploading images failed")
                }

                toast.success(uploadRes.data.message ?? "Images successfully uploaded")
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
                    <strong>Id {data?.data?._id}</strong>
                    <img src={displayImage}
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
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}>

                            <ImageSelector
                                name="image"
                                value={newImages}
                                onChange={(files) => {
                                    setNewImages(files)
                                }}
                                label="Image"
                                multiple={true}

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

                        <button disabled={loading} type="submit" className="submit-btn">
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </form>
                </article>
            </main>
        </DashboardLayout >
    )
}

export default ProductManagement