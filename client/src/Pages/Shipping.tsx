import axios from "axios"
import { useEffect, useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components"
import { useCreatePaymentMutation } from "../store/api/paymentAPI"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { saveShippingInfo } from "../store/reducers/cartSlice"
import type { ShippingInfo } from "../types/transaction.type"
import { handleChangeHOC } from "../utils/handleInputChange"
import { InitialShippingInfoData } from "../utils/InitialFormData"
import { ReduxResponseHandle } from "../utils/ReduxResponseHandle"


const Shipping = () => {
    const { items, coupon } = useAppSelector(
        state => state.cart
    );

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(InitialShippingInfoData)
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { onInput } = handleChangeHOC<ShippingInfo>(setShippingInfo)
    const createPaymentApi = useCreatePaymentMutation()[0];
    const [countries, setCountries] = useState<string[]>([]);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")

        dispatch(saveShippingInfo(shippingInfo));

        try {
            setLoading(true)
            const res = await createPaymentApi({
                items,
                shippingInfo,
                coupon,
            })

            const data = ReduxResponseHandle<{ clientSecret: string }>(res, null, null, true)

            navigate("/pay", { state: data?.clientSecret })
        } catch (error: any) {
            let errMessage =
                error?.data?.message
                || error.message
                || "Something went wrong"

            toast.error(errMessage)
            setError(errMessage)
        } finally {
            setLoading(false)
            setShippingInfo(InitialShippingInfoData)
        }

    }

    const fetchCountries = async () => {
        try {
            const res = await axios.get("https://restcountries.com/v3.1/all?fields=name")
            const countriesNames = res.data
                .map(((country: any) => country.name.common))
                .sort((a: string, b: string) => a.localeCompare(b));
            localStorage.setItem("countries", JSON.stringify(countriesNames));
            setCountries(countriesNames);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("countries")) {
            fetchCountries();
        } else {
            const storedCountries = localStorage.getItem("countries");
            if (storedCountries) {
                setCountries(JSON.parse(storedCountries));
            }
        }
    }, [])

    return (
        <Layout>
            <div className="shipping">
                <button
                    className="back-btn"
                    onClick={() => navigate("/cart")}
                >
                    <BiArrowBack />
                </button>

                <form onSubmit={submitHandler}>
                    <h1>Shipping Information</h1>

                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={onInput("address")}
                        placeholder="Address"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={onInput("city")}
                        placeholder="City"
                        required
                    />
                    <input
                        type="text"
                        name="pinCode"
                        value={shippingInfo.phone}
                        onChange={onInput("phone")}
                        placeholder="Pin Code"
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={onInput("state")}
                        placeholder="State"
                        required
                    />

                    <select
                        name="country"
                        required
                        value={shippingInfo.country}
                        onChange={(e) =>
                            setShippingInfo({
                                ...shippingInfo,
                                country: e.target.value
                            })}
                    >
                        <option value="" disabled>Select Country</option>
                        {countries?.length > 0 && countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))}

                    </select>
                    {error && <p className="form-error">{error}</p>}
                    <button type="submit" disabled={loading}>{loading ? "Loading..." : "Pay Now"}</button>
                </form>
            </div>
        </Layout>
    )
}

export default Shipping