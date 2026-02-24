import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { injectToken } from "../utils/axiosInstance"


const ClerkTokenProvider = () => {
  const { getToken } = useAuth()
  useEffect(() => {
    injectToken(getToken)
  }, [getToken])
  return null;
}

export default ClerkTokenProvider