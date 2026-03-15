import { DashboardLayout } from "../../../components"
import type { OrderItem } from "../../../types/transaction.type"
import { Link, Navigate, useParams } from "react-router-dom";
import { useGetOrderQuery, useProcessOrderMutation, } from "../../../store/api/transactionAPI";
import toast from "react-hot-toast";
import { useState } from "react";
import { ReduxResponseHandle } from "../../../utils/ReduxResponseHandle";




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
            const postRes = ReduxResponseHandle(res, null, null, true)
            if (postRes) {
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

                    {data?.data.orderItems.map(({ productId, name, quantity, price, image }) => (
                        <ProductCard
                            key={productId}
                            name={name}
                            image={image}
                            productId={productId}
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
                    <p>Subtotal : {data?.data.subtotal}</p>
                    <p>Shipping Charges : {data?.data.shippingCharges}</p>
                    <p>Tax : {data?.data.tax}</p>
                    <p>Discount : {data?.data.discount}</p>
                    <p>Total : {data?.data.total}</p>

                    <h5>Payment Info</h5>
                    <p>Payment ID : {data?.data.paymentInfo.id}</p>
                    <p>Payment Method : {data?.data.paymentMethod}</p>
                    <p>Payment Status :
                        {" "}<span
                            className={`
                                ${data?.data?.paymentInfo.status === "Processing"
                                    ? "purple"
                                    : data?.data?.paymentInfo.status === "Succeeded"
                                        ? "green"
                                        : "yellow"
                                }`
                            }>
                            {data?.data.paymentInfo.status}
                        </span>
                    </p>
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
                    <button className="submit-btn" onClick={() => setIsCancelled(true)}>Cancel</button>
                    <button onClick={updateHandler} className="submit-btn">Process Status</button>
                </article>
            </main>
        </DashboardLayout >
    )
}

export default TransactionManagement

const ProductCard = ({ name,
    image,
    price,
    quantity,
    productId
}: OrderItem & { image: string }) => (
    <div className="transaction-product--card">
        <img src={image} alt={name} />
        <Link to={`/admin/products/${productId}`}>{name}</Link>
        <span>${price} X {quantity} = ${price * quantity}</span>
    </div>
)