import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import type { CartItem } from "../types/cart.type";
import { useAppDispatch } from "../../store/hooks";
import type { CartItem } from "../../types/cart.type";

export type CartItemProps = {
    // productId: string;
    // name: string;
    // image: string;
    // price: number;
    // quantity: number;
    // stock: number;
    cartItem: CartItem;
    incrementHandler: (cardItem: CartItem) => void;
    decrementHandler: (cardItem: CartItem) => void;
    removeHandler: (product: string) => void
    // isRemovable?: boolean
    // handler: (cardItem: CartItem) => void
}

const CardItem = ({
    cartItem,
    decrementHandler,
    incrementHandler,
    removeHandler,
}: CartItemProps) => {

    const { productId, name, stock, image, price, quantity } = cartItem;
    const dispatch = useAppDispatch();

    // const addToCartHandler = (item: CartItem) => {
    //     if (item.stock < 1) {
    //         toast.error("Item is out of stock")
    //         return;
    //     }

    //     dispatch(addToCart(item))
    // }


    // const removeToCartHandler = () => {
    //     dispatch(removeToCart({ productId: productId }))
    //     toast.success("Product has been removed from the Cart")
    // }

    // const incrementDecrement = (isIncrement: boolean = false) => {
    //     if (quantity < 1 && !isIncrement) {
    //         removeToCartHandler()
    //         return;
    //     };

    //     const num = isIncrement ? quantity + 1 : quantity - 1;

    //     addToCartHandler({
    //         image,
    //         name,
    //         price,
    //         productId: productId,
    //         stock,
    //         quantity: num
    //     })
    // }

    return (
        <div className="cart-item">
            <img src={image} alt={name} />
            <div className="cart-item--info">
                <article>
                    <Link to={`/products/${productId}`}>{name}</Link>
                    <span>₹{price}</span>
                </article>

                <div className="cart-item--btn">
                    <div>
                        <button onClick={() => decrementHandler(cartItem)}>-</button>
                        <p>{quantity}</p>
                        <button onClick={() => incrementHandler(cartItem)}>+</button>
                    </div>

                    <button onClick={() => removeHandler(productId)} className="trash-icon--btn">
                        <FaTrash />
                    </button>

                </div>

            </div>
        </div>
    )
}

export default CardItem