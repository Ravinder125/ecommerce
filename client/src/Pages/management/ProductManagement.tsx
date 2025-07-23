import { useRef, useState, type ChangeEvent, type MouseEvent } from "react"
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
    const [formData, setFormData] = useState<FormData>({
        name: "",
        price: 0,
        stock: 0,
        image: ""
    })

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

    return (
        <DashboardLayout>
            <main className="management">
                <section>
                    <strong>Id - jajdsjlkasdkfl</strong>
                    <img src={
                        typeof formData.image === "string" ? formData.image : ""}
                        alt="New Image" />

                    <p>{formData.name}</p>
                    {
                        formData.stock > 0
                            ? <span className="green">Available</span>
                            : <span className="red">Not Available</span>
                    }
                    <h3>{`$${formData.price}`}</h3>
                </section>
                <article>
                    <form>
                        <h2>New Product</h2>
                        <div>
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Enter product name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="Price">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                placeholder="Enter product price"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="Stock">Stock</label>
                            <input
                                type="text"
                                name="stock"
                                value={formData.stock}
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
                                typeof formData.image === "string" ? formData.image : ""}
                                alt="New Image" />
                            }
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </article>
            </main>
        </DashboardLayout >
    )
}

export default ProductManagement