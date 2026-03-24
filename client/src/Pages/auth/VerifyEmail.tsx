import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { sendEmailVerification } from "firebase/auth";


export default function VerifyEmail() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkVerification = async () => {
    if (!auth.currentUser) return;
    setLoading(true);

    await auth.currentUser.reload();
    if (auth.currentUser.emailVerified) {
      toast.success("Email verified")
      navigate("/complete-profile")
    } else {
      sendEmailVerification(auth.currentUser)
      toast.error("Email not verified yet")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="auth-layout">
        <div className="card">
          <h2 className="card-header">Enter email code</h2>
          <p>
            Click the link sent to your email.
            Then click verify below.
          </p>

          <button
            className="submit-btn"
            onClick={checkVerification}
          >
            {loading ? "Checking..." : "I have verified"}
          </button>
        </div>

      </div>
    </>
  );
}
