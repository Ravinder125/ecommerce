import { useState, type FormEvent } from "react"
import { ExternalAuth, RedirectToOtherAuthPage } from "./signup";
import { InputBox } from "../../components/forms/InputBox";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
} from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const redirectToHome = () => navigate("/");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (!password?.trim()) {
                throw new Error("Password is required")
            }

            if (password?.trim().length <= 6) {
                throw new Error("Password must be 6 characters longs")
            }

            setIsLoading(true)
            const result = await signInWithEmailAndPassword(auth, email, password)
            if (result.user) {
                toast.success("Successfully logged in")
                navigate("/")
            }

        } catch (error: any) {
            const errMessage = error?.message || "Login failed"
            toast.error(errMessage)
            setError(errMessage)

        } finally {
            setIsLoading(false)
        }
    }

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            redirectToHome()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    const loginWithGitHub = async () => {
        try {
            const provider = new GithubAuthProvider()
            await signInWithPopup(auth, provider)
            redirectToHome()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="auth-layout">
            <div className="card">
                <div className="card-header">
                    <h2>Login Please</h2>
                    <p>Enter you credentials to get yourself login</p>
                </div>
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

                    {error && <p className="form-error">{error}</p>}
                    <button className="submit-btn" type="submit">
                        {isLoading ? "Loading..." : "Login"}
                    </button>

                    <ExternalAuth onGoogleClick={loginWithGoogle} onGithubClick={loginWithGitHub} />
                </form>

            </div>
        </div>
    )
}

export default Login