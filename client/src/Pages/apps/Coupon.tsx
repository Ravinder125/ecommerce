import { useState, type FormEvent } from "react"
import { DashboardLayout } from "../../components"


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


    const copyText = async (coupon: string) => {
        await window.navigator.clipboard.writeText(coupon);
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000);
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
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
    }

    return (
        <DashboardLayout>
            <main className="dashboard-app--container">
                <h1>Coupon</h1>
                <section>
                    <form className="coupon-form" onSubmit={submitHandler}>
                        <input
                            type="text"
                            placeholder="Text to include"
                            autoComplete="off"
                            value={prefix}
                            onChange={({ target }) => setPrefix(target.value)}
                            maxLength={size}
                        />
                        <input
                            type="number"
                            placeholder="Text to include"
                            value={size}
                            onChange={({ target }) => setSize(Number(target.value))}
                            min={8}
                            maxLength={25}
                            autoComplete="off"
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
                        <button className="submit-btn" type="submit">Generate</button>
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