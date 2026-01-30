import { SignOutButton } from "@clerk/clerk-react";

export default function LogoutButton() {
    return (
        <SignOutButton redirectUrl="/login">
            <button>Logout</button>
        </SignOutButton>
    );
}
