
import { useSignUp } from "@clerk/clerk-react"
import React, { useState } from "react"
import { createTypedInput } from "../../components/forms/InputBox"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import type { AuthFormData } from "../../types/auth.type"
import { InitialAuthUpData } from "../../utils/InitialFormData"
import { handleChangeHOC } from "../../utils/handleInputChange"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6"
import { useExternalSignUp } from "../../hooks/useExternalSignUp"


const InputBox = createTypedInput<AuthFormData>()


export default function Signup() {
    const [form, setForm] = useState<AuthFormData>(InitialAuthUpData)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const { gitHubSignup, googleSignup } = useExternalSignUp()

    const { signUp, isLoaded, } = useSignUp()

    const { onInput } = handleChangeHOC<AuthFormData>(setForm)

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
            console.error(errMessage || error);
        }
    }


    const handleGoogleClick = async () => {
        setIsLoading(true)
        await googleSignup()
        setIsLoading(false)
    }

    const handleGitHubClick = async () => {
        setIsLoading(true)
        await gitHubSignup()
        setIsLoading(false)
    }

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
                        onChange={onInput("email")}
                        required
                    />
                    <InputBox
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        placeholder="Enter your password"
                        onChange={onInput("password")}
                        required
                    />

                    <div id="clerk-captcha"></div>
                    <RedirectToOtherAuthPage />
                    <button className="submit-btn" type="submit">
                        {isLoading ? "Loading..." : "SignUp"}
                    </button>

                    <ExternalAuth onGoogleClick={handleGoogleClick} onGithubClick={handleGitHubClick} />
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

type ExternalAuthProps = {
    onGoogleClick: React.MouseEventHandler<SVGElement>;
    onGithubClick?: React.MouseEventHandler<SVGElement>;
};

export const ExternalAuth = ({
    onGoogleClick,
    onGithubClick,
}: ExternalAuthProps) => {
    return (
        <div className="external-auth">
            <FcGoogle onClick={onGoogleClick} aria-label="Sign up and Sign in with Google" />
            <FaGithub onClick={onGithubClick} aria-label="Sign up and Sign in with GitHub" />
        </div>
    );
};