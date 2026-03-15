import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import type { CartItem } from "../types/cart.type";


type ProductsProps = Pick<CartItem, "image" | "name" | "price" | "stock"> & {
    _id: string,
    handler: (carItem: CartItem) => void;
}

// const server = "jlajsdljf";
const ProductCard = ({ _id, name, price, image, stock, handler }
    : ProductsProps) => {
    return (
        <div key={_id} className="product-card">
            {/* <img src={`${server}/${image}`} alt={name} />
             */}
            <img src={image} alt={name} />
            <p>{name}</p>
            <span>₹{price}</span>
            <Link to={`/product-details/${_id}`}>Read more </Link>
            <div>
                <button
                    onClick={() => handler({
                        image,
                        name,
                        price,
                        productId: _id,
                        quantity: 1,
                        stock
                    })}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default ProductCard