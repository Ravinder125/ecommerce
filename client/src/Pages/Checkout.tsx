import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useCreateOrderMutation, } from '../store/api/transactionAPI';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCart } from '../store/reducers/cartSlice';
import type { NewOrder } from '../types/transaction.type';
import { ReduxResponseHandle } from '../utils/ReduxResponseHandle';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(stripeKey);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        shippingInfo,
        coupon,
        discount,
        items,
        shippingCharges,
        subtotal,
        total,
        tax,
    } = useAppSelector(state => state.cart)

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const newOrder = useCreateOrderMutation()[0];

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;
        setIsProcessing(true)

        const orderData: NewOrder = {
            shippingInfo,
            coupon,
            discount,
            orderItems: items,
            shippingCharges,
            subtotal,
            total,
            tax,
        }
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.origin },
            redirect: "if_required",
        })

        if (error) {
            setIsProcessing(false)
            return toast.error(error.message || "Something went wrong")
        }

        if (paymentIntent.status === "succeeded") {
            const res = await newOrder({
                ...orderData,
                paymentInfo: {
                    id: paymentIntent.id,
                    status: 'Succeeded'
                },
                paymentMethod: "Card"
            }
            );
            dispatch(clearCart());
            ReduxResponseHandle(res, navigate, "/orders")
        }
        setIsProcessing(false)
    }

    return (
        <div className='checkout-container'>
            <form onSubmit={submitHandler} className='card' >
                <PaymentElement />
                <button disabled={isProcessing} type='submit' className='submit-btn' >
                    {isProcessing ? "Processing..." : "Pay"}
                </button>
            </form>
        </div>
    )
}




const Checkout = () => {
    const location = useLocation();
    console.log(location)
    const clientSecret: string | undefined = location.state

    if (!clientSecret) return <Navigate to="/shipping" />

    return (
        <Elements
            options={{
                clientSecret
            }}
            stripe={stripePromise}
        >
            <CheckoutForm />
        </Elements>
    )
}

export default Checkout