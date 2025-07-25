import { useRef, useState, type ChangeEvent, type FormEvent, } from "react"
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
        .refine((file) => file instanceof File, "Image is required"
        )
        // .refine((file) => file?.size >= 6250,
        //     "File is too small (min 6kb)",
        // )
        .refine((file) => file?.size <= 6000000,
            "File is too large (max 6MB)"
        )
        .refine((file) =>
            ["image/jpg", "image/jpeg", "image/png", "image/webp"].indexOf(file?.type) !== -1,
            "Only JPG, PNG, or WEBP image are allowed"
        )
})

const NewProduct = () => {

    type FormData = {
        name: string,
        price: number,
        stock: number,
        image: string | null | ArrayBuffer,
    }

    const [error, setError] = useState<string>("")
    const ref = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState<FormData>({
        name: "",
        price: 0,
        stock: 0,
        image: ""
    })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name, type } = e.target;
        console.log(value, name, "happening")
        setFormData(prev => ({
            ...prev,
            [name]: type === "number"
                ? Number(value)
                : value?.trim()
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
        setError("")

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
    }

    return (
        <DashboardLayout>
            <main className="management">
                <article>
                    <form onSubmit={(event) => submitHandler(event)}>
                        <h2>New Product</h2>
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
                                required
                            />
                        </div>
                        <div>
                            {formData.image && <img src={
                                typeof formData.image === "string" ? formData.image : ""}
                                alt="New Image" />
                            }
                        </div>
                        {error && <div className="error-msg">{error}</div>}
                        <button type="submit" className="submit-btn">Create New</button>
                    </form>
                </article>
            </main>
        </DashboardLayout>
    )
}

export default NewProduct