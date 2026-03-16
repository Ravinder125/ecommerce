import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Layout } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart, calculatePrice, discountApplied, removeToCart, saveCoupon } from "../store/reducers/cartSlice";
import type { CartItem } from "../types/cart.type";
import { apiPaths } from "../utils/apiPath";
import CardItem from "./admin/cardItem";



const Cart = () => {
    const {
        items,
        // coupon,
        discount,
        shippingCharges,
        subtotal,
        tax,
        total
    } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

    const incrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity >= cartItem.stock) return;

        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    };

    const decrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity <= 1) return;

        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    };

    const removeHandler = (productId: string) => {
        dispatch(removeToCart({ productId }));
    };

    useEffect(() => {
        const { token: cancelToken, cancel } = axios.CancelToken.source()
        const timeout = setTimeout(() => {
            axios.post(`${apiPaths.coupons.applyDiscount}?code=${couponCode}`, {
                cancelToken,
            })
                .then((res) => {
                    dispatch(discountApplied(res.data.data.discount));
                    dispatch(saveCoupon(couponCode));
                    setIsValidCoupon(true);
                    dispatch(calculatePrice());
                })
                .catch(() => {
                    dispatch(discountApplied(0));
                    setIsValidCoupon(false);
                    dispatch(calculatePrice());
                })
        }, 1000);

        return () => {
            clearTimeout(timeout);
            cancel()
            setIsValidCoupon(false); // Reset coupon validity on unmount
        }

    }, [couponCode])

    return (
        <Layout>
            <div className="cart">
                <section>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <CardItem
                                cartItem={item}
                                decrementHandler={decrementHandler}
                                incrementHandler={incrementHandler}
                                removeHandler={removeHandler}
                            />
                        ))
                    ) : <h1>No Item Added</h1>

                    }
                </section>
                <aside>

                    <p>SubTotal: ₹{subtotal}</p>
                    <p>Shipping Charges: ₹{shippingCharges}</p>
                    <p>Tax: ₹{tax}</p>
                    <p>Discount: <em className="red"> - ₹{discount}</em></p>
                    <p>
                        <b>Total: ₹{total}</b>
                    </p>

                    <input
                        type="text"
                        value={couponCode}
                        onChange={({ target }) => setCouponCode(target.value)}
                        placeholder="Enter Coupon Code"
                        maxLength={22}
                    />

                    {couponCode && (
                        isValidCoupon
                            ? (
                                <span className="green">₹{discount} off using the
                                    <code>{couponCode}</code>
                                </span>
                            )
                            : <span className="red">Invalid Coupon <VscError /></span>
                    )}
                    {items.length > 0 && (
                        <Link to="/shipping">Checkout</Link>
                    )}
                </aside>
            </div>
        </Layout>
    )
}

export default Cart