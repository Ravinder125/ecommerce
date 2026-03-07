import { useState, type FormEvent } from "react"
import { DashboardLayout } from "../../../components"
import { axiosInstance } from "../../../utils/axiosInstance";
import { apiPaths } from "../../../utils/apiPath";
import toast from "react-hot-toast";
import { InputBox } from "../../../components/forms/InputBox";


const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%&*()_+";

const Coupon = () => {
    const [size, setSize] = useState<number>(8)
    const [prefix, setPrefix] = useState<string>("")
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(false)
    const [includeChar, setIncludeChar] = useState<boolean>(false)
    const [includeSymbol, setIncludeSymbol] = useState<boolean>(false)
    const [isCopied, setIsCopied] = useState<boolean>(false)

    const [coupon, setCoupon] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)


    const copyText = async (coupon: string) => {
        await window.navigator.clipboard.writeText(coupon);
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000);
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!includeChar && !includeNumbers && !includeSymbol) {
            return alert("Please Select One At Least")
        }
        let result: string = prefix || ""
        const loopLength: number = size - result.length;
        for (let i = 0; i < loopLength; i++) {
            let entireString: string = "";
            if (includeChar) entireString += allLetters;
            if (includeNumbers) entireString += allNumbers;
            if (includeSymbol) entireString += allSymbols;

            const randomNum: number = Math.floor(Math.random() * (entireString.length - 1))
            result += entireString[randomNum];
        }
        setCoupon(result)

        if (amount <= 50) {
            toast.error("Amount cannot be lower than 50")
            return;
        }

        if (!result.trim()) {
            toast.error("Coupon is required")
            return;
        }

        axiosInstance.post(apiPaths.coupons.root, { code: result, amount })
            .then((data) => {
                toast.success("Coupon successfully created")
                console.log(data)
            })
            .catch((err) => {
                toast.error("Error while creating Coupon")
                console.log(err)
            })

    }

    return (
        <DashboardLayout>
            <main className="dashboard-app--container">
                <h1>Coupon</h1>
                <section>
                    <form className="coupon-form" onSubmit={submitHandler}>
                        <InputBox
                            type="text"
                            name="text"
                            placeholder="Text to include"
                            autoComplete="off"
                            value={prefix}
                            onChange={({ target }) => setPrefix(target.value)}
                            maxLength={size}
                        />
                        <InputBox
                            type="number"
                            name="number"
                            placeholder="Number to include"
                            value={size.toString()}
                            onChange={({ target }) => setSize(Number(target.value))}
                            min={8}
                            maxLength={25}
                            autoComplete="off"
                        />

                        <InputBox
                            type="number"
                            name="amount"
                            onChange={({ target }) => setAmount(Number(target.value))}
                            value={amount.toString()}
                            max={30000}
                            min={50}
                        />

                        <fieldset>
                            <legend>Include</legend>
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={() => setIncludeNumbers(prev => !prev)}
                            />
                            <label>Numbers</label>
                            <input
                                type="checkbox"
                                checked={includeChar}
                                onChange={() => setIncludeChar(prev => !prev)}
                            />
                            <label>Characters</label>
                            <input
                                type="checkbox"
                                checked={includeSymbol}
                                onChange={() => setIncludeSymbol(prev => !prev)}
                            />
                            <label>Symbols</label>
                        </fieldset>
                        <button className="primary-btn" type="submit">Generate</button>
                    </form>
                    {coupon
                        && <code> {coupon} <span
                            onClick={() => copyText(coupon)}
                        >
                            {isCopied ? "Copied" : "Copy"}
                        </span>
                        </code>}
                </section>
            </main>
        </DashboardLayout>
    )
}

export default Coupon