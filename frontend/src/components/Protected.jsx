import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

/**
 * Signed-out users are redirected to /sign-in.
 *
 * Both <SignedIn> and <SignedOut> render nothing until Clerk has finished
 * loading, so there is no flash of protected content and no premature redirect.
 */
export default function Protected({ children }) {
    return (
        <>
            <SignedIn>{children}</SignedIn>

            <SignedOut>
                <Navigate to="/sign-in" replace />
            </SignedOut>
        </>
    );
}
