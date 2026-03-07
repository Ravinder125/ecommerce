import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";


interface ProductsProps {
    _id: string,
    name: string,
    price: number,
    image: string,
    stock: number,
    handler: () => void;
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
                    onClick={handler}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default ProductCard