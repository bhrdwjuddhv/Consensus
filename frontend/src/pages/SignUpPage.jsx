import { SignUp } from "@clerk/clerk-react";

import ShapeDecor from "../components/ShapeDecor.jsx";

export default function SignUpPage() {
    return (
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 lg:py-24">
            <header className="mb-8 text-center">
                <h1 className="bauhaus-display text-4xl sm:text-6xl">Sign up</h1>
                <p className="mt-3 text-ink/70">Three models, one answer. Free to try.</p>
            </header>

            <div className="relative border-2 lg:border-4 border-ink bg-white p-6 shadow-[8px_8px_0px_0px_#121212]">
                <div className="absolute -top-3 -left-3">
                    <ShapeDecor shape="triangle" color="#F0C020" size={22} />
                </div>

                <SignUp
                    routing="path"
                    path="/sign-up"
                    signInUrl="/sign-in"
                    forceRedirectUrl="/studio"
                />
            </div>
        </div>
    );
}
