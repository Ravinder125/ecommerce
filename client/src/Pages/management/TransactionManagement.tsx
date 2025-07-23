import { useState } from "react"
import { DashboardLayout } from "../../components"
import { type OrderType, type OrderItemType } from "../../types"
import { Link } from "react-router-dom";


const orderItems: OrderItemType[] = [
    {
        name: "Wireless Mouse",
        image: "https://www.bbassets.com/media/uploads/p/l/40341612_1-portronics-chyro-10000mah-magnetic-wireless-fast-charging-power-bank-black.jpg",
        price: 799,
        quantity: 2,
        _id: "item_001",
    },
    {
        name: "Mechanical Keyboard",
        image: "https://www.bbassets.com/media/uploads/p/l/40341612-2_1-portronics-chyro-10000mah-magnetic-wireless-fast-charging-power-bank-black.jpg",
        price: 2499,
        quantity: 1,
        _id: "item_002",
    },
    {
        name: "HD Monitor",
        image: "https://www.bbassets.com/media/uploads/p/l/40341612-4_1-portronics-chyro-10000mah-magnetic-wireless-fast-charging-power-bank-black.jpg",
        price: 9999,
        quantity: 1,
        _id: "item_003",
    },
];

const TransactionManagement = () => {
    const [order, setOrder] = useState<OrderType>({
        name: "Aarav Sharma",
        address: {
            house: "12A",
            street: "Lakeview Road",
            locality: "Sector 45",
            city: "Bangalore",
            pinCode: "560045",
            state: "Karnataka",
            country: "India",
        },
        status: "Processing",
        quantity: 2,
        subTotal: 5498,
        discount: 500,
        shippingCharges: 100,
        tax: 180,
        totalAmount: 5278,
        orderItems: orderItems,
        _id: "order_1001",
    }
    );

    const {
        name,
        address: { house, street, locality, city, pinCode, state, country, },
        subTotal,
        shippingCharges,
        tax,
        discount,
        totalAmount,
        status
    } = order;

    const updateHandler = () => {
        setOrder(prev => ({
            ...prev,
            status: prev.status === "Processing" ? "Shipped" : "Delivered",
        }))
    }

    return (
        <DashboardLayout>
            <main className="management">
                <section style={{
                    padding: "2rem",
                }}>
                    <h2>Order Items</h2>

                    {order.orderItems.map(({ name, image, _id, quantity, price }) => (
                        <ProductCard
                            key={_id}
                            name={name}
                            image={image}
                            _id={_id}
                            quantity={quantity}
                            price={price}
                        />
                    ))}
                </section>

                <article className="shipping-info--card">
                    <h1>Order Info</h1>

                    <h5>User Info</h5>
                    <p>Name: {name}</p>
                    <p>Address: {`${house}, ${street},
                        ${locality}, ${city},
                        ${pinCode}, ${state},
                        ${country}`}
                    </p>

                    <h5>Amount Info</h5>
                    <p>Subtotal: {subTotal}</p>
                    <p>Shipping Charges: {shippingCharges}</p>
                    <p>Tax: {tax}</p>
                    <p>Discount: {discount}</p>
                    <p>Total: {totalAmount}</p>

                    <h5>Status Info</h5>
                    <p>Status:
                        <span className={status === "Delivered"
                            ? "purple"
                            : status === "Shipped"
                                ? "green"
                                : "red"
                        }>
                            {" "} {status}
                        </span>
                    </p>
                    <button onClick={updateHandler} className="submit-btn">Process Status</button>
                </article>
            </main>
        </DashboardLayout>
    )
}

export default TransactionManagement

type ProductCardProps = {
    name: string,
    image: string,
    price: number,
    quantity: number,
    _id: string,
}

const ProductCard = ({ name, image, price, quantity, _id }: ProductCardProps) => (
    <div className="transaction-product--card">
        <img src={image} alt={name} />
        <Link to={`/products/${_id}`}>{name}</Link>
        <span>${price} X {quantity} = ${price * quantity}</span>
    </div>
)