import { useRef, useState, type FormEvent } from "react"
import { createTypedInput } from "../../components/forms/InputBox"
import { handleChangeHOC } from '../../utils/handleInputChange'
// import { CompleteFormData } from "../../types/auth.type"
import { InitialCompleteFormData } from "../../utils/InitialFormData"
import { imageHandler } from "../../utils/imageHandler"
// import { authService, } from "../../services/auth.service"
import toast from "react-hot-toast"

import { useUser } from '@clerk/clerk-react'
import { validateData } from "../../utils/validateFields"
import { completeFormDataSchema, type UserPayload } from "../../validations/completeProfile.validation"
// import { useSyncProfileMutation } from "../../store/api/syncProfileAPI"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { ApiResponse } from "../../types/api.type"
import { useSyncProfileMutation } from "../../store/api/syncProfileAPI"
import { useDispatch } from "react-redux"
import { authService } from "../../services/auth.service"
import { useAppDispatch } from "../../store/hooks"
import { getUser } from "../../store/reducers/authSlice"

// import { authService } from '../../services/auth.service'
// import {  } from "../../store/api/syncProfileAPI"
// import { syncProfileAPI } from "../../store/api/syncProfileAPI"

type CompleteFormData = Omit<UserPayload, "email">

const InputBox = createTypedInput<CompleteFormData>()

const CompleteProfile = () => {
    const [formData, setFormData] = useState<CompleteFormData>(InitialCompleteFormData)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { user, isLoaded } = useUser()
    const ref = useRef<HTMLInputElement | null>(null)
    const { onInput, handleInputChange } = handleChangeHOC<CompleteFormData>(setFormData)

    const syncProfileAPI = useSyncProfileMutation()[0]

    const dispatch = useAppDispatch()

    // const syncProfile = useSyncProfileMutation()[0]

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            if (!isLoaded || !user) return

            setIsLoading(true)

            const payload = {
                avatar: formData.avatar,
                dob: formData.dob,
                gender: formData.gender,
                name: formData.name,
                role: formData.role,
                email: user.emailAddresses[0].emailAddress
            }

            const { success, data, message } =
                validateData<UserPayload>(completeFormDataSchema, payload)

            if (!success) {
                throw new Error(message)
            }

            const res = await syncProfileAPI(data!)
            console.log(res.error)

            if (res.data) {
                toast.success(res.data.message!)
                // toast.success("Profile completed")
                const response = await authService.getProfile()

                dispatch(getUser(response.data))
            } else {
                const err = res.error as FetchBaseQueryError
                const message = (err.data as ApiResponse).message
                throw new Error(message)
            }

        } catch (error: any) {

            let errMessage =
                error?.data?.message
                || error.message
                || "Something went wrong"

            toast.error(errMessage)
            setError(errMessage)

            console.error("Sync error:", error)

        } finally {
            setIsLoading(false)
        }
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
                        label="Full Name"
                        type="name"
                        name="name"
                        value={formData.name}
                        placeholder="Enter your name"
                        onChange={onInput("name")}
                        required
                    />
                    <InputBox
                        label="Role"
                        type="text"
                        name="role"
                        value={formData.role}
                        placeholder="Role"
                        onChange={onInput("role")}
                    />
                    <InputBox
                        label="Gender"
                        type="text"
                        name="gender"
                        placeholder="Enter your gender"
                        value={formData.gender}
                        onChange={onInput("gender")}
                        required
                        action={() => setFormData(prev => ({ ...prev, avatar: "" }))}
                    />
                    <InputBox
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={onInput("dob")}
                        required
                    />
                    <InputBox
                        label="Enter avatar"
                        type="file"
                        name="avatar"
                        inputRef={ref}
                        value={typeof formData.avatar === "string" ? formData.avatar : ""}
                        onChange={e => imageHandler(
                            e.target.files?.[0]!,
                            (base: string) => handleInputChange("avatar", base))}
                        action={() => setFormData(prev => ({ ...prev, avatar: "" }))}
                        required
                    />


                    {/* <div className="input-box"> */}
                    {/* <label htmlFor="image">image</label> */}
                    {/* <input
                            type="file"
                            id="image"
                            ref={ref}
                            onChange={imageHandler}
                            style={{ display: "none" }}
                        /> */}
                    {/* 
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
                        } */}
                    {/* </div> */}
                    {/* <InputBox
                        label="Avatar URL"
                        type="file"
                        name="avatar"
                        value={typeof form.avatar === "string" ? form.avatar : ""}
                        placeholder="Avatar URL"
                        onChange={e => setForm({ ...form, avatar: e.target.value })}
                        required
                    /> */}
                    <button
                        disabled={isLoading}
                        className="submit-btn"
                        type="submit"
                    >
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CompleteProfile