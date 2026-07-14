import { SignIn } from "@clerk/clerk-react";

import ShapeDecor from "../components/ShapeDecor.jsx";

export default function SignInPage() {
    return (
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 lg:py-24">
            <header className="mb-8 text-center">
                <h1 className="bauhaus-display text-4xl sm:text-6xl">Sign in</h1>
                <p className="mt-3 text-ink/70">The studio is for signed-in users.</p>
            </header>

            <div className="relative border-2 lg:border-4 border-ink bg-white p-6 shadow-[8px_8px_0px_0px_#121212]">
                <div className="absolute -top-3 -left-3">
                    <ShapeDecor shape="circle" color="#D02020" size={22} />
                </div>

                <SignIn
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    forceRedirectUrl="/studio"
                />
            </div>
        </div>
    );
}
