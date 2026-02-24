import { Link } from "react-router-dom"
import { Layout, ProductCard } from "../components"
import { useEffect, useState } from "react"
import data from "../assets/products.json"
import { useLatestProductsQuery } from "../store/api/productApi"
import { useAppDispatch } from "../store/hooks"
import { addToCart } from "../store/reducers/cartSlice"

const images = [
    "https://cdn.shopify.com/s/files/1/2303/2711/files/2_e822dae0-14df-4cb8-b145-ea4dc0966b34.jpg?v=1617059123",
    "https://plus.unsplash.com/premium_photo-1661769750859-64b5f1539aa8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdCUyMGltYWdlfGVufDB8fDB8fHww",
    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
    "https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0=",
    "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg",
]

const Home = () => {
    const [showImageIndex, setShowImageIndex] = useState<number>(0)
    const dispatch = useAppDispatch()
    const { data, isLoading } = useLatestProductsQuery();
    const addToCartHandler = (productId: string) => {
        dispatch(addToCart({ _id: productId }))
    }

    useEffect(() => {
        const timeout = setInterval(() => {
            setShowImageIndex(prev => prev === (images.length - 1)
                ? 0 : ++prev)
        }, 5000);
        return () => clearInterval(timeout)
    }, [showImageIndex])

    // useEffect(() => {
    // const fetchLatestProducts = async () => {
    //     const res = await latestProducts()
    //     console.log(res)
    // }
    // fetchLatestProducts()
    // })
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <Layout>
            <div className="home">

                <section className="image-slider">
                    {images?.map((img, idx) => (
                        <img
                            key={img}
                            src={img}
                            alt="images"
                            style={{
                                display: showImageIndex === idx ? "block" : "none"
                            }} />
                    ))}
                </section>
                <h1>Latest Products
                    <Link to="search" className="findmore">
                        More
                    </Link>
                </h1>

                <main>
                    {
                        data?.data.map(({
                            _id,
                            name,
                            price,
                            // image,
                            stock,
                        }, key) => (
                            <ProductCard
                                key={_id}
                                _id={_id}
                                name={name}
                                price={price}
                                image={images[key]}
                                stock={stock}
                                handler={() => addToCartHandler(_id)}
                            />
                        ))
                    }
                </main>
            </div>
        </Layout>
    )
}

export default Home