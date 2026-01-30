import { useState, type FormEvent } from "react"
import { RedirectToOtherAuthPage } from "./Signup";
import { InputBox } from "../../components/forms/InputBox";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const { signIn, setActive, isLoaded } = useSignIn()
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isLoaded || !setActive || !signIn) return;

        try {

            const result = await signIn.create({
                password,
                identifier: email
            })

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId })
            }
            toast.success("Successfully logged in")

            // await signIn.prepareFirstFactor({
            //     strategy: "email_code",
            //     emailAddressId: email
            // })
            // navigate("/verify-email")

        } catch (error: any) {
            const errMessage = error.errors?.[0]?.message

            console.error(errMessage);
            toast.error(errMessage)

        }

    }
    return (
        <div className="auth-layout">
            <div className="card">
                <div className="card-header">
                    <h2>Login Please</h2>
                    <p>Enter you credentials to get yourself login</p>
                </div>
                {/* <div>
                    <label>Gender</label>
                    <select
                        value={gender}
                        onChange={({ target }) => setGender(target.value)}
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div> */}
                <form onSubmit={handleSubmit}>
                    <InputBox
                        type="email"
                        name="email"
                        label="Email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={({ target }) => setEmail(target.value)}
                        required
                    />
                    <InputBox
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={({ target }) => setPassword(target.value)}
                        required
                    />
                    <RedirectToOtherAuthPage
                        label="Signup here"
                        para="Don't have an account"
                        url="/signup"
                    />
                    <button className="submit-btn" type="submit">Login</button>
                </form>
                <div>
                    {/* <p>Already Signed In Once</p> */}
                    {/* <button>
                        <FcGoogle /> <span>Sign in with Google</span>
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default Login