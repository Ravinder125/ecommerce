import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface CartItemProps {
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

const CardItem = ({ cartItem }: { cartItem: CartItemProps }) => {
    const { _id, name, image, price, quantity } = cartItem;
    return (
        <div className="cart-item">
            <img src={image} alt={name} />
            <article>
                <Link to={`/products/${_id}`}>{name}</Link>
                <span>₹{price}</span>
            </article>

            <div>
                <button>-</button>
                <p>{quantity}</p>
                <button>+</button>
            </div>

            <button>
                <FaTrash />
            </button>
        </div>
    )
}

export default CardItem