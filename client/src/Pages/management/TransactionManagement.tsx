import { DashboardLayout } from "../../components"
import type { OrderItem } from "../../types/transaction.type"
import { Link, Navigate, useParams } from "react-router-dom";
import { useGetOrderQuery, useProcessOrderMutation, } from "../../store/api/transactionAPI";
import toast from "react-hot-toast";
import { useState } from "react";


const orderItems = [
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

    const [isCancelled, setIsCancelled] = useState<boolean>(false);

    const params = useParams();
    const id = params.id

    if (!id) {
        return <Navigate to="/admin/transactions" replace />
    }

    const processOrderApi = useProcessOrderMutation()[0]
    const { data, error, isLoading } = useGetOrderQuery(id)

    const updateHandler = async () => {
        try {
            const res = await processOrderApi({
                orderId: id,
                isCancelled: isCancelled
            })

            if (res.data?.data) {
                toast.success("Order processed successfully")
            }
        } catch (error) {
            toast.error("Failed to process order")
        }
    }
    if (isLoading) return <div>Loading...</div>
    if (error) {
        toast.error(data?.message || "Something went wrong")
        return <div>Something went wrong</div>
    }


    return (
        <DashboardLayout>
            <main className="management">
                <section style={{
                    padding: "2rem",
                }}>
                    <h2>Order Items</h2>

                    {data?.data.orderItem.map(({ product, name, quantity, price }, idx) => (
                        <ProductCard
                            key={product}
                            name={name}
                            image={orderItems[idx].image}
                            product={product}
                            quantity={quantity}
                            price={price}
                        />
                    ))}
                </section>

                <article className="shipping-info--card">
                    <h1>Order Info</h1>

                    <h5>User Info</h5>
                    <p>Name: {data?.data?.buyer ?? "user name"}</p>
                    <p>Address: {`
                     ${data?.data?.shippingInfo?.address},
                         ${data?.data.shippingInfo.city},
                        ${data?.data.shippingInfo.country}, ${data?.data.shippingInfo.state},
                        ${data?.data.shippingInfo.country}`}
                    </p>

                    <h5>Amount Info</h5>
                    <p>Subtotal: {data?.data.subtotal}</p>
                    <p>Shipping Charges: {data?.data.shippingCharge}</p>
                    <p>Tax: {data?.data.taxPrice}</p>
                    <p>Discount: {data?.data.discount}</p>
                    <p>Total: {data?.data.totalPrice}</p>

                    <h5>Status Info</h5>
                    <p>Status:
                        <span
                            style={{ marginLeft: "5px" }}
                            className={`
                                ${data?.data?.orderStatus === "Processing"
                                    ? "yellow"
                                    : data?.data?.orderStatus === "Shipped"
                                        ? "purple"
                                        : data?.data?.orderStatus === "Delivered"
                                            ? "green"
                                            : "red"
                                }`
                            }
                        >
                            {" "} {data?.data?.orderStatus}
                        </span>
                    </p>
                    <button onClick={updateHandler} className="submit-btn">Process Status</button>
                </article>
            </main>
        </DashboardLayout >
    )
}

export default TransactionManagement

// type ProductCardProps = {
//     name: string,
//     image: string,
//     price: number,
//     quantity: number,
//     _id?: string,
// }

const ProductCard = ({ name,
    image,
    price,
    quantity,
    product
}: OrderItem & { image: string }) => (
    <div className="transaction-product--card">
        <img src={image} alt={name} />
        <Link to={`/admin/products/${product}`}>{name}</Link>
        <span>${price} X {quantity} = ${price * quantity}</span>
    </div>
)