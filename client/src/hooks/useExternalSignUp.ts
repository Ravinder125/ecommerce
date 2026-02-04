import { useSignUp } from "@clerk/clerk-react"


type HandleExternalSignUphReturn = {
    googleSignup: () => {},
    gitHubSignup: () => {}
}

export const useExternalSignUp = (): HandleExternalSignUphReturn => {
    const { signUp, isLoaded } = useSignUp()

    if (!isLoaded) {
        return {
            googleSignup: async () => { },
            gitHubSignup: async () => { }
        }
    }

    const googleSignup = async () => {
        await signUp.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/complete-profile",
        });
    };

    const gitHubSignup = async () => {
        await signUp.authenticateWithRedirect({
            strategy: "oauth_github",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/complete-profile",
        });
    };

    return { gitHubSignup, googleSignup }
}


