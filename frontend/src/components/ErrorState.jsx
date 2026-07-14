import { X } from "lucide-react";
import Button from "./Button.jsx";

/**
 * Whole-run failure. A single provider failing is NOT this — that degrades into
 * an error variant on one card while the run continues.
 */
export default function ErrorState({ message, onRetry }) {
    return (
        <div
            role="alert"
            className="relative border-2 lg:border-4 border-ink bg-red text-white p-6 lg:p-8
                 shadow-[4px_4px_0px_0px_#121212] lg:shadow-[8px_8px_0px_0px_#121212]"
        >
            <div className="absolute -top-3 -right-3 border-2 border-ink bg-yellow p-1">
                <X size={18} strokeWidth={4} className="text-ink" />
            </div>

            <span className="bauhaus-label">Run failed</span>

            <p className="mt-3 text-lg font-bold leading-snug lg:text-xl">
                {message ?? "Something went wrong."}
            </p>

            {onRetry && (
                <Button variant="ghost" size="sm" className="mt-6" onClick={onRetry}>
                    Try again
                </Button>
            )}
        </div>
    );
}
