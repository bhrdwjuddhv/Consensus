import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

import GeometricLogo from "./GeometricLogo.jsx";
import Button from "./Button.jsx";

const LINKS = [
    { to: "/studio", label: "Studio" },
    { to: "/how-it-works", label: "How it works" },
    { to: "/history", label: "History" },
];

const linkClasses = ({ isActive }) =>
    [
        "bauhaus-label px-3 py-2 border-2 border-transparent transition-all duration-200 ease-out",
        isActive ? "bg-ink text-white border-ink" : "hover:border-ink",
    ].join(" ");

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="border-b-4 border-ink bg-canvas sticky top-0 z-50">
            <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
                <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                    <GeometricLogo size={36} />
                    <span className="bauhaus-display text-xl lg:text-2xl">Consensus</span>
                </Link>

                <div className="hidden items-center gap-2 md:flex">
                    {LINKS.map(({ to, label }) => (
                        <NavLink key={to} to={to} className={linkClasses}>
                            {label}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <SignedIn>
                        <div className="border-2 border-ink p-0.5 shadow-[3px_3px_0px_0px_#121212]">
                            <UserButton />
                        </div>
                    </SignedIn>

                    <SignedOut>
                        <Button as="link" to="/sign-in" size="sm" variant="ink">
                            Sign in
                        </Button>
                    </SignedOut>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-label="Toggle menu"
                    className="border-2 border-ink bg-white p-2 shadow-[3px_3px_0px_0px_#121212]
                     transition-all duration-200 ease-out active:translate-x-[2px]
                     active:translate-y-[2px] active:shadow-none md:hidden"
                >
                    {open ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
                </button>
            </nav>

            {open && (
                <div className="border-t-4 border-ink bg-white md:hidden">
                    <div className="flex flex-col gap-1 p-4">
                        {LINKS.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setOpen(false)}
                                className={linkClasses}
                            >
                                {label}
                            </NavLink>
                        ))}

                        <div className="mt-3 border-t-2 border-ink pt-3">
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <Button
                                    as="link"
                                    to="/sign-in"
                                    size="sm"
                                    variant="ink"
                                    onClick={() => setOpen(false)}
                                >
                                    Sign in
                                </Button>
                            </SignedOut>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
