import { useEffect, useState, type ChangeEvent } from "react"
import { Layout } from "../components"
import { BiArrowBack } from "react-icons/bi"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Shipping = () => {
    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    })
    const navigate = useNavigate();
    const [countries, setCountries] = useState<string[]>([]);



    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({
            ...prev, [name]: value
        }))
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

                <form >
                    <h1>Shipping Information</h1>

                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={inputChangeHandler}
                        placeholder="Address"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={inputChangeHandler}
                        placeholder="City"
                        required
                    />
                    <input
                        type="text"
                        name="pinCode"
                        value={shippingInfo.pinCode}
                        onChange={inputChangeHandler}
                        placeholder="Pin Code"
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={inputChangeHandler}
                        placeholder="State"
                        required
                    />

                    <select
                        name="country"
                        required
                        value={shippingInfo.country}
                        onChange={inputChangeHandler}
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