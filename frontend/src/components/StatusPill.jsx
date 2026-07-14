import { Check, Loader, X } from "lucide-react";

/**
 * Radius is binary in this system: rounded-none or rounded-full. A pill is the
 * one place full applies.
 */
const TONES = {
    ok: { bg: "bg-ink text-white", Icon: Check },
    error: { bg: "bg-red text-white", Icon: X },
    pending: { bg: "bg-muted text-ink", Icon: Loader },
};

export default function StatusPill({ tone = "ok", children, className = "" }) {
    const { bg, Icon } = TONES[tone] ?? TONES.ok;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1
                  bauhaus-label ${bg} ${className}`}
        >
            <Icon size={12} strokeWidth={3} className={tone === "pending" ? "animate-spin" : ""} />
            {children}
        </span>
    );
}
