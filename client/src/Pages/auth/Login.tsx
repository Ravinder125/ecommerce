import { useState, type FormEvent } from "react"
import { ExternalAuth, RedirectToOtherAuthPage } from "./Signup";
import { InputBox } from "../../components/forms/InputBox";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useExternalLogin } from "../../hooks/useExternalSignIn";

const Login = () => {
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const { signIn, setActive, isLoaded } = useSignIn()
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const {
        loginWithGithub,
        loginWithGoogle
    } = useExternalLogin()

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
            navigate("/")

        } catch (error: any) {
            const errMessage = error.errors?.[0]?.message

            console.error(errMessage);
            toast.error(errMessage)

        }

    }

    const onGoogleClick = async () => {
        setIsLoading(true)
        await loginWithGoogle()
        setIsLoading(false)
    }
    const onGithubClick = async () => {
        setIsLoading(true)
        await loginWithGithub()
        setIsLoading(false)

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
                    <button className="submit-btn" type="submit">
                        {isLoading ? "Loading..." : "Login"}
                    </button>

                    <ExternalAuth onGoogleClick={onGoogleClick} onGithubClick={onGithubClick} />
                </form>

            </div>
        </div>
    )
}

export default Login