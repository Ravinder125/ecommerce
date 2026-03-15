import { useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { createTypedInput } from "../../components/forms/InputBox"
import { handleChangeHOC } from '../../utils/handleInputChange'
import { InitialCompleteFormData } from "../../utils/InitialFormData"
import type { CompleteFormData } from '../../types/user.type'
import { useUser } from '@clerk/clerk-react'
import { ImageSelector } from "../../components/forms/ImageSelector"
import { useSyncProfileMutation } from "../../store/api/syncProfileAPI"
import { ReduxResponseHandle } from "../../utils/ReduxResponseHandle"
import { validateData } from "../../utils/validateFields"
import { userFormDataSchema, type UserPayload } from "../../validations/completeProfileSchema"

const InputBox = createTypedInput<CompleteFormData>()

const CompleteProfile = () => {
    const [formData, setFormData] = useState<CompleteFormData>(InitialCompleteFormData)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { user, isLoaded } = useUser()
    const { onInput, handleInputChange } = handleChangeHOC<CompleteFormData>(setFormData)
    const syncProfileAPI = useSyncProfileMutation()[0]

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
            } as UserPayload

            const { success, data, message } = validateData(userFormDataSchema, payload)

            if (!success) {
                throw new Error(message)
            }
            const genders = ["male", "female", "other"]
            if (!genders.some(g => g === formData.gender)) {
                return;
            }
            const res = await syncProfileAPI(data!)
            ReduxResponseHandle(res)

        } catch (error: any) {

            let errMessage =
                error?.data?.message
                || error.message
                || "Something went wrong"

            toast.error(errMessage)
            setError(errMessage)
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
                    <select
                        name="gender"
                        id="gender"
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <InputBox
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={onInput("dob")}
                        required
                    />
                    <ImageSelector
                        name="avatar"
                        existingImages={[]}
                        onChange={(e) => handleInputChange("avatar", e[0])}
                        multiple={false}
                        value={[formData.avatar!]}
                        label="Avatar"
                        required={true}
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
                    <p className="form-error">{error}</p>
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