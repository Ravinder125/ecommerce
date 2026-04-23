import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types/cart.type";


type ProductsProps = Pick<CartItem, "image" | "name" | "price" | "stock"> & {
    _id: string,
    handler: (carItem: CartItem) => void;
}

const ProductCard = (
    {
        _id,
        name,
        price,
        image,
        stock,
        handler
    }
        : ProductsProps) => {

    const navigate = useNavigate()
    const handlerRedirect = (id: string) => {
        navigate(`/product-details/${id}`)
    }

    return (
        <div className="product-card" onClick={() => handlerRedirect(_id)}>
            <div className="product-card--image">
                <img src={image} alt={name} />
            </div>
            <div className="product-card--content">
                <p>{name}</p>
                <span>₹{price}</span>
                <button
                    className="submit-btn"
                    onClick={() => handler({
                        image,
                        name,
                        price,
                        productId: _id,
                        quantity: 1,
                        stock
                    })}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard