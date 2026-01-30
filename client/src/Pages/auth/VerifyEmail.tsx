import { useSignUp } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputBox } from "../../components/forms/InputBox";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded || !signUp || !setActive) return;
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Successfully signed in")
      }
    } catch (error: any) {
      const errMessage = error.errors?.[0]?.message
      console.error(errMessage);
      toast.error(errMessage)
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div className="auth-layout">
        <div className="card">
          <h2 className="card-header">Enter email code</h2>
          <p>Code has been sent your given email address. Please check you Email inBox</p>
          <form onSubmit={onSubmit}>
            <InputBox
              value={code}
              name="email-code"
              type="tel"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
            />
            <button className="submit-btn" type="submit">Verify</button>
          </form>
        </div>

      </div>
    </>
  );
}
