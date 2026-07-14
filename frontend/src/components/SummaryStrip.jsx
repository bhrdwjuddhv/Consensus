import { motion } from "motion/react";

import { getModel } from "../lib/models.js";
import ShapeDecor from "./ShapeDecor.jsx";

const CATEGORIES = [
    { key: "bestReasoning", label: "Best reasoning" },
    { key: "bestAccuracy", label: "Best accuracy" },
    { key: "bestClarity", label: "Best clarity" },
];

/** Three verdicts, then the evaluator's one-line note on what it merged. */
export default function SummaryStrip({ summary }) {
    if (!summary) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
                {CATEGORIES.map(({ key, label }) => {
                    const winnerId = summary[key];

                    if (!winnerId) return null;

                    const model = getModel(winnerId);

                    return (
                        <div
                            key={key}
                            className="border-2 lg:border-4 border-ink bg-white p-5
                         shadow-[4px_4px_0px_0px_#121212] lg:shadow-[6px_6px_0px_0px_#121212]"
                        >
                            <span className="bauhaus-label text-ink/60">{label}</span>

                            <div className="mt-3 flex items-center gap-3">
                                <span
                                    className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink"
                                    style={{ backgroundColor: model.color }}
                                >
                                    <ShapeDecor
                                        shape={model.shapeName}
                                        color="#F0F0F0"
                                        size={18}
                                    />
                                </span>

                                <span className="bauhaus-display text-2xl">{model.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {summary.synthesis && (
                <p className="mt-5 border-l-4 border-ink pl-4 text-sm leading-relaxed text-ink/70">
                    {summary.synthesis}
                </p>
            )}
        </motion.section>
    );
}
