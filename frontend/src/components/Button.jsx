import { Link } from "react-router-dom";

/**
 * The press is the whole interaction: the button physically moves into its own
 * shadow. Mechanical, 200ms, no easing curves that feel organic.
 */
const VARIANTS = {
    primary: "bg-red text-white",
    blue: "bg-blue text-white",
    yellow: "bg-yellow text-ink",
    ink: "bg-ink text-white",
    ghost: "bg-white text-ink",
};

const SIZES = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
};

const base = [
    "inline-flex items-center justify-center gap-2",
    "border-2 lg:border-4 border-ink rounded-none",
    "font-bold uppercase tracking-widest",
    "shadow-[4px_4px_0px_0px_#121212] lg:shadow-[6px_6px_0px_0px_#121212]",
    "transition-all duration-200 ease-out",
    "hover:-translate-y-[2px]",
    "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    "disabled:opacity-40 disabled:pointer-events-none",
].join(" ");

export default function Button({
    as = "button",
    to,
    href,
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
}) {
    const classes = `${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

    if (as === "link" && to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    if (as === "a" && href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
