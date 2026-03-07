import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { useAppDispatch } from "../store/hooks";
import { addToCart, removeToCart } from "../store/reducers/cartSlice";
import type { CartItem } from "../types/cart.type";

type AddToCartProps = {
    _id: string,
    name: string,
    stock: number,
    image: string,
    price: number,
    quantity: number,
    isRemovable: boolean;
}

const AddToCart = (cartItem: AddToCartProps) => {
    const { _id, name, stock, image, price, quantity, isRemovable } = cartItem;
    const dispatch = useAppDispatch();

    const addToCartHandler = (item: CartItem) => {
        if (item.stock < 1) {
            toast.error("Item is out of stock")
            return;
        }
        dispatch(addToCart(item))
        toast.success("Product has been added in the Cart")
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
        <div className="cart-item--btn">
            <div>
                <button onClick={() => incrementDecrement(false)}>-</button>
                <p>{quantity}</p>
                <button onClick={() => incrementDecrement(true)}>+</button>
            </div>

            {isRemovable &&
                <button onClick={removeToCartHandler} className="trash-icon--btn">
                    <FaTrash />
                </button>
            }

        </div >
    )
}

export default AddToCart