import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { DashboardLayout } from "../../components"
import { MdOutlineFileUpload } from "react-icons/md"
import z from "zod"

const ProductDataSchema = z.object({
    name: z
        .string()
        .nonempty({ message: "Name is required" }),
    price: z
        .number()
        .min(1, { message: "Price cannot be lower than 1" })
        .nonnegative({ message: "Price cannot be empty" }),
    stock: z
        .number()
        .min(1, { message: "stock cannot be lower than 1" })
        .nonnegative({ message: "Price cannot be empty" }),
    image: z
        .string()
        .nonempty({ message: "Name is required" }),
})

const imageSchema = z.object({
    image: z
        .any()
        .refine((file) => file instanceof File, {
            message: "Image is required"
        })
        .refine((file) => file?.size >= 6250, {
            message: "File is too small (min 6kb)",
        })
        .refine((file) => file?.size <= 6000000, {
            message: "File is too large (max 6MB)"
        })
        .refine((file) =>
            ["image/jpg", "image/jpeg", "image/png", "image/webp"].indexOf(file?.type) !== -1,
            { message: "Only JPG, PNG, or WEBP image are allowed" }
        )
})


const ProductManagement = () => {
    const [error, setError] = useState<string>("")
    const ref = useRef<HTMLInputElement>(null)
    type FormData = {
        name: string,
        price: number,
        stock: number,
        image: string | null | ArrayBuffer,
    }
    const [productData, setProductData] = useState<FormData>({
        name: "",
        price: 0,
        stock: 0,
        image: ""
    })

    const [formData, setFormData] = useState<FormData>({
        name: "",
        price: 0,
        stock: 0,
        image: ""
    })


    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number"
                ? Number(value)
                : value
        }))
    }

    const changeImageHandler = () => {
        setError("")
        const file: File | undefined = ref.current?.files?.[0]
        const result = imageSchema.safeParse({ image: file })
        if (!result.success) {
            setError(result.error.issues?.[0].message)
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

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: FormData = {
            name: formData.name,
            price: formData.price,
            stock: formData.stock,
            image: formData.image
        }
        const result = ProductDataSchema.safeParse(payload)
        if (!result.success) {
            setError(result?.error?.issues?.[0].message)
            return;
        }
        setProductData(payload)
    }

    return (
        <DashboardLayout>
            <main className="management">
                <section>
                    <strong>Id - jajdsjlkasdkfl</strong>
                    {formData.image && <img src={
                        typeof productData.image === "string" ? productData.image : " "}
                        alt="New Image" />
                    }

                    <p>{productData.name}</p>
                    {
                        productData.stock > 0
                            ? <span className="green">{productData.stock}{" "}Available</span>
                            : <span className="red">Not Available</span>
                    }
                    <h2>{`$${productData.price}`}</h2>
                </section>
                <article>
                    <form onSubmit={submitHandler}>
                        <h2>Manage Products</h2>
                        <div>
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => inputChangeHandler(e)}
                                placeholder="Enter product name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="Price">Price</label>
                            <input
                                type="number"
                                name="price"
                                min={0}
                                value={formData.price}
                                onChange={(e) => inputChangeHandler(e)}
                                placeholder="Enter product price"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="Stock">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                min={0}
                                value={formData.stock}
                                onChange={(e) => inputChangeHandler(e)}
                                placeholder="Enter product Stock"
                                required
                            />
                        </div>
                        <div id="file-upload"
                            onClick={() => ref.current?.click()}
                        >
                            <MdOutlineFileUpload />
                            <label htmlFor="Name" style={{ cursor: "pointer" }}>
                                Choose Image
                            </label>
                            <input
                                ref={ref}
                                onChange={changeImageHandler}
                                type="file"
                                name="name"
                                required
                            />
                        </div>
                        <div>
                            {formData.image && <img src={
                                typeof formData.image === "string" ? formData.image : " "}
                                alt="New Image" />
                            }
                        </div>
                        {error && <div className="error-msg">{error}</div>}
                        <button type="submit" className="submit-btn">Update</button>
                    </form>
                </article>
            </main>
        </DashboardLayout >
    )
}

export default ProductManagement