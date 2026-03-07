import axios from "axios"
import { useEffect, useState, type FormEvent } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { ShippingInfo } from "../types/transaction.type"
import { handleChangeHOC } from "../utils/handleInputChange"
import { saveShippingInfo } from "../store/reducers/cartSlice"
import { axiosInstance } from "../utils/axiosInstance"
import { apiPaths } from "../utils/apiPath"
import toast from "react-hot-toast"


const Shipping = () => {
    const { items, coupon } = useAppSelector(
        state => state.cart
    );

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        address: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        pinCode: 0
    })
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { onInput } = handleChangeHOC<ShippingInfo>(setShippingInfo)

    const [countries, setCountries] = useState<string[]>([]);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")

        dispatch(saveShippingInfo(shippingInfo));

        try {
            setLoading(true)
            const { data } = await axiosInstance.post(apiPaths.payments.root, {
                items: items,
                shippingInfo,
                coupon,
            })

            navigate("/pay", {
                state: data.clientSecret
            })
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
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

                    <input
                        type="text"
                        name="pinCode"
                        value={shippingInfo.pinCode}
                        onChange={onInput("pinCode")}
                        placeholder="ex.11000"
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

                    <button type="submit">Pay now</button>
                </form>
            </div>
        </Layout>
    )
}

export default Shipping