import { motion } from "motion/react";
import { Check, X, Loader } from "lucide-react";

import ShapeDecor from "./ShapeDecor.jsx";

/**
 * The ordered process, as it happens.
 *
 * Honesty note: the backend returns a single JSON payload and does not stream
 * stage events, so stages 2–5 show as *active* (in flight) while the request is
 * out — never as "done". Nothing is marked done or failed until the real response
 * lands and Studio reconciles each model against the `scores` it actually
 * contains. The progression is a UX affordance; the outcomes are real.
 */

const STATE_STYLES = {
    pending: "bg-muted/40 border-ink/25 text-ink/40",
    active: "bg-white border-ink text-ink",
    done: "bg-white border-ink text-ink",
    failed: "bg-red border-ink text-white",
};

function StateIcon({ state, accent }) {
    if (state === "done") {
        return (
            <span className="flex h-7 w-7 items-center justify-center border-2 border-ink bg-ink">
                <Check size={14} strokeWidth={4} className="text-white" />
            </span>
        );
    }

    if (state === "failed") {
        return (
            <span className="flex h-7 w-7 items-center justify-center border-2 border-ink bg-yellow">
                <X size={14} strokeWidth={4} className="text-ink" />
            </span>
        );
    }

    if (state === "active") {
        return (
            <span
                className="flex h-7 w-7 items-center justify-center border-2 border-ink"
                style={{ backgroundColor: accent ?? "#F0C020" }}
            >
                <Loader size={14} strokeWidth={4} className="animate-spin text-ink" />
            </span>
        );
    }

    return <span className="h-7 w-7 border-2 border-ink/25 bg-transparent" />;
}

export default function ProcessTimeline({ stages }) {
    return (
        <section aria-live="polite" className="space-y-3">
            <div className="flex items-center gap-4">
                <h2 className="bauhaus-label shrink-0">Process</h2>
                <span aria-hidden="true" className="h-1 grow bg-ink" />
            </div>

            <ol className="space-y-2">
                {stages.map((stage, index) => {
                    const { key, label, state, model } = stage;
                    const isActive = state === "active";

                    return (
                        <motion.li
                            key={key}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.04 }}
                            className={`flex items-center gap-4 border-2 px-4 py-3
                          transition-all duration-200 ease-out
                          ${STATE_STYLES[state]}
                          ${isActive ? "shadow-[4px_4px_0px_0px_#121212]" : ""}`}
                        >
                            <span className="bauhaus-label w-6 shrink-0 opacity-50">
                                {index + 1}
                            </span>

                            <StateIcon state={state} accent={model?.color} />

                            {model ? (
                                <ShapeDecor
                                    shape={model.shapeName}
                                    color={model.color}
                                    size={18}
                                    className="shrink-0"
                                />
                            ) : (
                                <span className="w-[18px] shrink-0" aria-hidden="true" />
                            )}

                            <span className="bauhaus-label grow">{label}</span>

                            <span className="bauhaus-label shrink-0 opacity-60">
                                {state === "done" && "Done"}
                                {state === "failed" && "Failed"}
                                {state === "active" && "Working"}
                                {state === "pending" && "Waiting"}
                            </span>
                        </motion.li>
                    );
                })}
            </ol>
        </section>
    );
}
