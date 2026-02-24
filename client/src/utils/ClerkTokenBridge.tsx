// ClerkTokenBridge.tsx
import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { setTokenGetter } from "./tokenManager"

export default function ClerkTokenBridge() {
  const { getToken } = useAuth()

  useEffect(() => {
    setTokenGetter(getToken)
  }, [getToken])

  return null
}