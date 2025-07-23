import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { DashboardLayout } from "../../components"
import { MdOutlineFileUpload } from "react-icons/md"

const ProductManagement = () => {
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

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = ref.current?.files?.[0]
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
        setProductData(payload)
    }

    return (
        <DashboardLayout>
            <main className="management">
                <section>
                    <strong>Id - jajdsjlkasdkfl</strong>
                    <img src={typeof productData.image === "string" ? productData.image : " "} alt="New Image" />


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
                        <button type="submit" className="submit-btn">Update</button>
                    </form>
                </article>
            </main>
        </DashboardLayout >
    )
}

export default ProductManagement