import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import type { CartItem } from "../types/cart.type";
import { useAppDispatch } from "../store/hooks";
import { addToCart, removeToCart } from "../store/reducers/cartSlice";
import toast from "react-hot-toast";
import type { CartItem } from "../types/cart.type";

interface CartItemProps {
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    stock: number;
    // handler: (cardItem: CartItem) => void
}

const CardItem = (cartItem: CartItemProps) => {
    const { _id, name, stock, image, price, quantity } = cartItem;
    const dispatch = useAppDispatch();

    const addToCartHandler = (item: CartItem) => {
        if (item.stock < 1) {
            toast.error("Item is out of stock")
            return;
        }

        dispatch(addToCart(item))
    }


    const removeToCartHandler = () => {
        dispatch(removeToCart({ productId: _id }))
        toast.success("Product has been removed from the Cart")
    }

    const incrementDecrement = (isIncrement: boolean = false) => {
        if (quantity < 1 && !isIncrement) {
            removeToCartHandler()
            return;
        };

        const num = isIncrement ? quantity + 1 : quantity - 1;

        addToCartHandler({
            image,
            name,
            price,
            productId: _id,
            stock,
            quantity: num
        })
    }



    return (
        <div className="cart-item">
            <img src={image} alt={name} />
            <div className="cart-item--info">
                <article>
                    <Link to={`/products/${_id}`}>{name}</Link>
                    <span>₹{price}</span>
                </article>

                <div className="cart-item--btn">
                    <div>
                        <button onClick={() => incrementDecrement(false)}>-</button>
                        <p>{quantity}</p>
                        <button onClick={() => incrementDecrement(true)}>+</button>
                    </div>

                    <button onClick={removeToCartHandler} className="trash-icon--btn">
                        <FaTrash />
                    </button>

                </div>

            </div>
        </div>
    )
}

export default CardItem