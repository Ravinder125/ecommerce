
import { useSignUp } from "@clerk/clerk-react"
import { useState } from "react"
import { InputBox } from "../../components/forms/InputBox"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

interface SignupFormData {
    email: string
    password: string
    // role: string
    // dob: string
    // avatar: string | ArrayBuffer | null

}

const InitialSignUpData = {
    email: "",
    password: "",
    // role: "",
    // dob: "",
    // avatar: null
}

export default function Signup() {
    const { signUp, isLoaded } = useSignUp()
    const [form, setForm] = useState<SignupFormData>(InitialSignUpData)
    const navigate = useNavigate()

    const handleInputChange = (key: keyof SignupFormData, value: string) => {
        setForm({ ...form, [key]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoaded) return

        try {

            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            })

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })
            toast.success("Email verification code sent")

            navigate("/verify-email");

        } catch (error: any) {
            const errMessage = error.errors?.[0]?.message
            toast.error(errMessage)
            console.error(errMessage);
        }
    }

    // const ref = useRef<HTMLInputElement>(null)

    // const imageHandler = () => {
    //     const file: File | undefined = ref.current?.files?.[0]
    //     // const result = imageSchema.safeParse({ image: file })
    //     // if (!result.success) {
    //     //     setError(result.error.issues?.[0].message)
    //     //     return;
    //     // }
    //     const reader: FileReader = new FileReader();
    //     if (file) {
    //         reader.readAsDataURL(file);
    //         reader.onloadend = () => {
    //             if (typeof reader.result === "string") {
    //                 setForm(prev => ({ ...prev, avatar: reader.result }))
    //             } else {
    //                 setForm(prev => ({ ...prev, avatar: "" }))
    //             }
    //         }
    //     }
    // }

    return (

        <div className="auth-layout">
            <div className="card">
                <div className="card-header">
                    <h2>Signup To Join US</h2>
                    <p>Enter you credentials to get yourself registered</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <InputBox
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="Enter your email"
                        onChange={e => handleInputChange("email", e.target.value)}
                        required
                    />
                    <InputBox
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        placeholder="Enter your password"
                        onChange={e => handleInputChange("password", e.target.value)}
                        required
                    />
                    {/* <InputBox
                        label="Role"
                        type="text"
                        name="role"
                        value={form.role}
                        placeholder="Role"
                        onChange={e => setForm({ ...form, role: e.target.value })}
                    /> */}
                    {/* <InputBox
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={e => setForm({ ...form, dob: e.target.value })}
                        required
                    /> */}
                    {/* <InputBox
                        label="Enter avatar"
                        type="file"
                        name="avatar"
                        inputRef={ref}
                        value={typeof form.avatar === "string" ? form.avatar : ""}
                        onChange={imageHandler}
                        required
                        action={() => setForm(prev => ({ ...prev, avatar: "" }))}
                    /> */}

                    {/* <div className="input-box">
                        <label htmlFor="image">image</label>
                        <input type="file" id="image" ref={ref}
                            onChange={imageHandler} />

                        {form.avatar && (
                            <div className="image-preview">
                                <div>
                                    <img
                                        src={typeof form.avatar === "string" ? form.avatar : ""}
                                    />
                                    <MdDelete onClick={() => setForm(prev => ({ ...prev, avatar: "" }))} />
                                </div>
                            </div>
                        )
                        }
                    </div> */}
                    {/* <InputBox
                        label="Avatar URL"
                        type="file"
                        name="avatar"
                        value={form.avatar}
                        placeholder="Avatar URL"
                        onChange={e => setForm({ ...form, avatar: e.target.value })}
                        required
                    /> */}
                    <div id="clerk-captcha"></div>
                    <RedirectToOtherAuthPage />
                    <button className="submit-btn" type="submit">SignUp</button>
                </form>
            </div>
        </div>
    )
}

export type RedirectToOtherAuthPageProps = {
    url?: string;
    label?: string
    para?: string
}

export const RedirectToOtherAuthPage = ({
    url = "/login",
    label = "Login here",
    para = "Already have an account" }: RedirectToOtherAuthPageProps) => {

    return <div className="redirect-other--page">
        <p>{para}{" "}?</p>
        <Link to={url}>{label}</Link>
    </div>
}
