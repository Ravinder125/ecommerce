// hooks/useExternalLogin.ts
import { useSignIn } from "@clerk/clerk-react";

export const useExternalLogin = () => {
    const { signIn, isLoaded } = useSignIn();

    const loginWithGoogle = async () => {
        if (!isLoaded) return;

        await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/",
        });
    };

    const loginWithGithub = async () => {
        if (!isLoaded) return;

        await signIn.authenticateWithRedirect({
            strategy: "oauth_github",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/",
        });
    };

    return {
        loginWithGoogle,
        loginWithGithub,
    };
};
