import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Layout } from "../components";
import {  useAppSelector } from "../store/hooks";
import CardItem from "./CardItem";


// // const cartItems = [
// //     {
// //         "_id": "prod-sony-wh1000xm6-black",
// //         "name": "Sony WH‑1000XM6 Wireless Headphones (Black)",
// //         "price": 44900,
// //         "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT31zHhgLfXB3uvyu7PVbeZ9QwNZURG_KWXpHFoiFKKzLWvv4a99WW-ddoHuGPeACY5wi39S8yt_vXWZ60x2HpBOUcK6ebKCMotO8O1KQLtZi1zx1-Z6ZEGON4",
// //         "quantity": 1,
// //     },
// //     {
// //         "_id": "prod-razer-deathadder-v3",
// //         "name": "Razer DeathAdder V3 HyperSpeed Mouse",
// //         "price": 8499,
// //         "image": "https://m.media-amazon.com/images/I/71fRKz9pUnL.jpg",
// //         "quantity": 2,
// //     },
// //     {
// //         "_id": "prod-sony-wh1000xm6-black",
// //         "name": "Sony WH‑1000XM6 Wireless Headphones (Black)",
// //         "price": 44900,
// //         "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT31zHhgLfXB3uvyu7PVbeZ9QwNZURG_KWXpHFoiFKKzLWvv4a99WW-ddoHuGPeACY5wi39S8yt_vXWZ60x2HpBOUcK6ebKCMotO8O1KQLtZi1zx1-Z6ZEGON4",
// //         "quantity": 1,
// //     },
// //     {
// //         "_id": "prod-razer-deathadder-v3",
// //         "name": "Razer DeathAdder V3 HyperSpeed Mouse",
// //         "price": 8499,
// //         "image": "https://m.media-amazon.com/images/I/71fRKz9pUnL.jpg",
// //         "quantity": 2,
// //     },
// //     {
// //         "_id": "prod-sony-wh1000xm6-black",
// //         "name": "Sony WH‑1000XM6 Wireless Headphones (Black)",
// //         "price": 44900,
// //         "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT31zHhgLfXB3uvyu7PVbeZ9QwNZURG_KWXpHFoiFKKzLWvv4a99WW-ddoHuGPeACY5wi39S8yt_vXWZ60x2HpBOUcK6ebKCMotO8O1KQLtZi1zx1-Z6ZEGON4",
// //         "quantity": 1,
// //     },
// //     {
// //         "_id": "prod-razer-deathadder-v3",
// //         "name": "Razer DeathAdder V3 HyperSpeed Mouse",
// //         "price": 8499,
// //         "image": "https://m.media-amazon.com/images/I/71fRKz9pUnL.jpg",
// //         "quantity": 2,
// //     },
// //     {
// //         "_id": "prod-sony-wh1000xm6-black",
// //         "name": "Sony WH‑1000XM6 Wireless Headphones (Black)",
// //         "price": 44900,
// //         "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT31zHhgLfXB3uvyu7PVbeZ9QwNZURG_KWXpHFoiFKKzLWvv4a99WW-ddoHuGPeACY5wi39S8yt_vXWZ60x2HpBOUcK6ebKCMotO8O1KQLtZi1zx1-Z6ZEGON4",
// //         "quantity": 1,
// //     },
// //     {
// //         "_id": "prod-razer-deathadder-v3",
// //         "name": "Razer DeathAdder V3 HyperSpeed Mouse",
// //         "price": 8499,
// //         "image": "https://m.media-amazon.com/images/I/71fRKz9pUnL.jpg",
// //         "quantity": 2,
// //     },
// //     {
// //         "_id": "prod-sony-wh1000xm6-black",
// //         "name": "Sony WH‑1000XM6 Wireless Headphones (Black)",
// //         "price": 44900,
// //         "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT31zHhgLfXB3uvyu7PVbeZ9QwNZURG_KWXpHFoiFKKzLWvv4a99WW-ddoHuGPeACY5wi39S8yt_vXWZ60x2HpBOUcK6ebKCMotO8O1KQLtZi1zx1-Z6ZEGON4",
// //         "quantity": 1,
// //     },
// //     {
// //         "_id": "prod-razer-deathadder-v3",
// //         "name": "Razer DeathAdder V3 HyperSpeed Mouse",
// //         "price": 8499,
// //         "image": "https://m.media-amazon.com/images/I/71fRKz9pUnL.jpg",
// //         "quantity": 2,
// //     },
// //     {
// //         "_id": "prod-sony-wh1000xm6-black",
// //         "name": "Sony WH‑1000XM6 Wireless Headphones (Black)",
// //         "price": 44900,
// //         "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT31zHhgLfXB3uvyu7PVbeZ9QwNZURG_KWXpHFoiFKKzLWvv4a99WW-ddoHuGPeACY5wi39S8yt_vXWZ60x2HpBOUcK6ebKCMotO8O1KQLtZi1zx1-Z6ZEGON4",
// //         "quantity": 1,
// //     },
// //     {
// //         "_id": "prod-razer-deathadder-v3",
// //         "name": "Razer DeathAdder V3 HyperSpeed Mouse",
// //         "price": 8499,
// //         "image": "https://m.media-amazon.com/images/I/71fRKz9pUnL.jpg",
// //         "quantity": 2,
// //     },
// //     {
// //         "_id": "prod-sony-wh1000xm6-black",
// //         "name": "Sony WH‑1000XM6 Wireless Headphones (Black)",
// //         "price": 44900,
// //         "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT31zHhgLfXB3uvyu7PVbeZ9QwNZURG_KWXpHFoiFKKzLWvv4a99WW-ddoHuGPeACY5wi39S8yt_vXWZ60x2HpBOUcK6ebKCMotO8O1KQLtZi1zx1-Z6ZEGON4",
// //         "quantity": 1,
// //     },
// //     {
// //         "_id": "prod-razer-deathadder-v3",
// //         "name": "Razer DeathAdder V3 HyperSpeed Mouse",
// //         "price": 8499,
// //         "image": "https://m.media-amazon.com/images/I/71fRKz9pUnL.jpg",
// //         "quantity": 2,
// //     },
// // ];
// const subTotal = 4000;
// const tax = Math.round(subTotal * 0.18);
// const shippingCharges = 200;
// const discount = 200;
// const total = subTotal + tax + shippingCharges - discount;

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

    const cart = useAppSelector(state => state.cart)
   
    useEffect(() => {
        cart.items.map(item => console.log(item))
        const timeout = setTimeout(() => {
            Math.random() > 0.5
                ? setIsValidCoupon(true)
                : setIsValidCoupon(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
            setIsValidCoupon(false); // Reset coupon validity on unmount


        }

    }, [couponCode])
    
    return (
        <Layout>
            <div className="cart">
                <section>
                    {cart.items.length > 0 ? (
                        cart.items.map((item) => (
                            <CardItem
                                key={item.productId}
                                _id={item.productId}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                stock={item.stock}
                            />
                        ))
                    ) : <h1>No Item Added</h1>

                    }
                </section>
                <aside>

                    <p>SubTotal: ₹{cart.subtotal}</p>
                    <p>Shipping Charges: ₹{cart.shippingCharges}</p>
                    <p>Tax: ₹{cart.tax}</p>
                    <p>Discount: <em className="red"> - ₹{cart.discount}</em></p>
                    <p>
                        <b>Total: ₹{cart.total}</b>
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
                                <span className="green">₹{cart.discount} off using the
                                    <code>{couponCode}</code>
                                </span>
                            )
                            : <span className="red">Invalid Coupon <VscError /></span>
                    )}
                    {cart.items.length > 0 && (
                        <Link to="/shipping">Checkout</Link>
                    )}
                </aside>
            </div>
        </Layout>
    )
}

export default Cart