import { motion } from "motion/react";
import { Check, X } from "lucide-react";

import ShapeDecor from "./ShapeDecor.jsx";

const MAX_SCORE = 10;

/** Hard-edged bar, 0–10. No rounded caps, no gradient. */
function ScoreBar({ label, value, color }) {
    const safe = typeof value === "number" ? value : 0;
    const pct = Math.max(0, Math.min(100, (safe / MAX_SCORE) * 100));

    return (
        <div>
            <div className="flex items-baseline justify-between gap-2">
                <span className="bauhaus-label text-ink/60">{label}</span>
                {/* `overall` may be a decimal (9.5) — display exactly as given. */}
                <span className="font-bold tabular-nums">{safe}</span>
            </div>

            <div className="mt-1 h-3 w-full border-2 border-ink bg-canvas">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="h-full"
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    );
}

/**
 * One model's evaluation.
 *
 * `score` absent (the model never answered) renders the failed variant rather
 * than crashing. Missing strengths/weaknesses default to empty arrays.
 */
export default function ModelScoreCard({ model, score, index = 0 }) {
    const failed = !score;

    const strengths = score?.strengths ?? [];
    const weaknesses = score?.weaknesses ?? [];

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut", delay: index * 0.08 }}
            className={`bauhaus-card flex flex-col p-5 transition-transform duration-200 ease-out
                  hover:-translate-y-1 ${failed ? "bg-red text-white" : "bg-white"}`}
        >
            <div className="absolute -top-3 -right-3">
                <ShapeDecor shape={model.shapeName} color={model.color} size={22} />
            </div>

            <header className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="bauhaus-display text-2xl">{model.label}</h3>
                    <p className={`bauhaus-label mt-1 ${failed ? "text-white/70" : "text-ink/50"}`}>
                        {model.model}
                    </p>
                </div>

                {failed ? (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-ink bg-yellow">
                        <X size={22} strokeWidth={4} className="text-ink" />
                    </span>
                ) : (
                    <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-ink
                       bauhaus-display text-xl tabular-nums"
                        style={{ backgroundColor: model.color, color: "#121212" }}
                    >
                        {score.overall}
                    </span>
                )}
            </header>

            {failed ? (
                <p className="mt-6 grow font-bold leading-relaxed">
                    No response. This model did not return an answer, so the evaluator scored the
                    others without it.
                </p>
            ) : (
                <>
                    <div className="mt-6 space-y-3">
                        <ScoreBar label="Accuracy" value={score.accuracy} color={model.color} />
                        <ScoreBar label="Reasoning" value={score.reasoning} color={model.color} />
                        <ScoreBar label="Clarity" value={score.clarity} color={model.color} />
                        <ScoreBar label="Overall" value={score.overall} color="#121212" />
                    </div>

                    <div className="mt-6 grow space-y-4 border-t-2 border-ink/15 pt-4">
                        {strengths.length > 0 && (
                            <div>
                                <span className="bauhaus-label text-ink/60">Strengths</span>
                                <ul className="mt-2 space-y-1.5">
                                    {strengths.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-sm">
                                            <Check
                                                size={14}
                                                strokeWidth={4}
                                                className="mt-0.5 shrink-0 text-blue"
                                            />
                                            <span className="leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {weaknesses.length > 0 && (
                            <div>
                                <span className="bauhaus-label text-ink/60">Weaknesses</span>
                                <ul className="mt-2 space-y-1.5">
                                    {weaknesses.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-sm">
                                            <X
                                                size={14}
                                                strokeWidth={4}
                                                className="mt-0.5 shrink-0 text-red"
                                            />
                                            <span className="leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            )}
        </motion.article>
    );
}
