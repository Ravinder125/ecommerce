import { useParams } from "react-router-dom"
import { useGetProductQuery } from "../store/api/productAPI"
import { useState } from "react"
import AddToCart from "../components/AddToCart"
import { Layout } from "../components"
import Rating from "./Rating"

const ProductDetails = () => {
    const params = useParams()
    const id = params.id
    const [activeIdx, setActiveIndex] = useState<number>(0);
    const { isError, isFetching, isLoading, data } = useGetProductQuery(id!, {})
    
    if (isError) {
        return <div>Something went wrong</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isFetching) {
        return <div>Loading...</div>
    }

    const product = data?.data
    // let rating = product?.ratings;
    return (
        <Layout>
            <div className="product-details">
                <div className="container">
                    <section className="section-product--overview">
                        <div className="product-images">
                            <div >
                                <img src={product?.images[activeIdx]} alt="product-image--1" />
                            </div>

                            <div className="product-images--list">
                                {product?.images.map((i, idx) => (
                                    <div>
                                        <img
                                            src={i}
                                            alt={i}
                                            onClick={() => setActiveIndex(idx)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="product-content">
                            <h5>New/Lifestyle/Sneaker/Canvas-Sneaker</h5>

                            <h1>Canvas Sneaker</h1>
                            <div className="price-review">
                                <div className="price">&#8377; {product?.price}</div>
                                <div className="review">
                                    <Rating value={product?.ratings ?? 0} max={5} />
                                </div>
                            </div>

                            <p>{product?.description}</p>

                            <AddToCart
                                _id={product?._id ?? ""}
                                image={product?.images?.[0] ?? ""}
                                name={product?.name ?? ""}
                                price={product?.price ?? 0}
                                quantity={1}
                                stock={product?.stock ?? 0}
                                isRemovable={false}
                            />
                        </div>

                    </section>
                </div>
            </div>

        </Layout>
    )

}

export default ProductDetails