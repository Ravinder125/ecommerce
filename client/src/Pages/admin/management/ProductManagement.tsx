import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useEffect, useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { DashboardLayout } from "../../../components"
import { createTypedInput } from "../../../components/forms/InputBox"
import TextArea from "../../../components/forms/TextArea"
import { useGetProductQuery, useUpdateProductMutation, useUploadProductImagesMutation } from "../../../store/api/productAPI"
import type { ApiResponse } from "../../../types/api.type"
import { InitialProductFormData } from "../../../utils/InitialFormData"
import { handleChangeHOC } from "../../../utils/handleInputChange"
import { updateProductDataSchema, type UpdateProductFormData } from "../../../validations/productDataSchema"
import SelectCategory from "./selectCategory"
import { validateData } from "../../../utils/validateFields"
import { ImageSelector } from "../../../components/forms/ImageSelector"
import { useImageHandler } from "../../../hooks/useImageHandler"
import { ImageCarousel } from "../../../components/ImageCarousel"


const InputBox = createTypedInput<UpdateProductFormData>()

const ProductManagement = () => {
    const params = useParams();
    const productId = params.id;

    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [deleteImages, setDeleteImages] = useState<string[]>([])



    const [formData, setFormData] = useState<UpdateProductFormData>(InitialProductFormData)
    const { isError, isFetching, isLoading, data } = useGetProductQuery(productId!, {
        refetchOnMountOrArgChange: false,
        refetchOnFocus: false,
        refetchOnReconnect: false
    })
    const updateProductAPI = useUpdateProductMutation()[0]
    const uploadImages = useUploadProductImagesMutation()[0];


    const { onInput, handleInputChange } = handleChangeHOC<UpdateProductFormData>(setFormData)

    useEffect(() => {
        if (data?.data?.images) {
            setExistingImages(data.data.images)
        }
    }, [data])

    const previews = useImageHandler(newImages);
    const displayImage: string[] = previews.concat(existingImages);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const payload = {
            ...formData,
            stock: Number(formData.stock),
            price: Number(formData.price)
        };

        const result = validateData(updateProductDataSchema, payload);

        if (!result.success) {
            toast.error(result.message!);
            return;
        }

        try {
            const id = productId!;
            setLoading(true);

            // 1️⃣ Update product info
            const updateRes = await updateProductAPI({ ...payload, id });

            if (updateRes.error) {
                const err = updateRes.error as FetchBaseQueryError;
                throw new Error((err.data as ApiResponse)?.message);
            }

            // 2️⃣ Upload new images
            if (newImages.length > 0) {
                await uploadImages({ id, images: newImages });
            }

            // 3️⃣ Delete removed images
            if (deleteImages.length > 0) {
                // await deleteProductImages({ id, images: deleteImages });
            }

            toast.success("Product updated successfully");

        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = (idx: number) => {
        // remove existing image
        if (idx < existingImages.length) {
            const removeUrl = existingImages[idx];

            if (setDeleteImages) {
                setDeleteImages(prev => [...prev, removeUrl]);
            }

            return;
        }

        // remove newly added image
        const newIndex = idx - existingImages.length;
        const updated = newImages.filter((_, i) => i !== newIndex);
        setNewImages(updated)

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
                <section style={{ display: "flex" }}>
                    <strong>Id {data?.data?._id}</strong>
                    <div>
                        <ImageCarousel images={displayImage} />
                    </div>


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
                            flexDirection: "column"
                        }}>

                            <ImageSelector
                                name="image"
                                value={newImages}
                                onChange={(files) => {
                                    setNewImages(files)
                                }}
                                label="Image"
                                multiple={true}
                                existingImages={existingImages}
                                setDeleteImages={setDeleteImages}

                            />
                            <div>
                                <ImageCarousel onRemove={handleRemove} images={displayImage} />
                            </div>
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