import { motion } from "motion/react";

import { MODELS } from "../lib/models.js";
import ShapeDecor from "./ShapeDecor.jsx";

/**
 * The synthesized answer — the headline deliverable.
 *
 * Rendered with whitespace-pre-wrap so the model's own line breaks and list
 * formatting survive. No markdown library.
 */
export default function FinalAnswer({ finalResponse, contributors = [] }) {
    const missing = !finalResponse;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            aria-live="polite"
            className="relative border-2 lg:border-4 border-ink bg-ink text-white
                 shadow-[4px_4px_0px_0px_#121212] lg:shadow-[8px_8px_0px_0px_#121212]"
        >
            {/* The three shapes, composed — the final answer is all of them at once. */}
            <div className="absolute -top-4 -right-4 hidden items-center gap-1 lg:flex">
                {MODELS.map(({ id, shapeName, color }) => (
                    <ShapeDecor key={id} shape={shapeName} color={color} size={26} />
                ))}
            </div>

            <div className="border-b-2 lg:border-b-4 border-white/20 px-6 py-4 lg:px-8">
                <span className="bauhaus-label text-yellow">Synthesized</span>
            </div>

            <div className="px-6 py-7 lg:px-8 lg:py-9">
                {missing ? (
                    <div className="border-2 border-yellow bg-red p-5">
                        <p className="bauhaus-label">No synthesis</p>
                        <p className="mt-2 font-bold leading-relaxed">
                            The evaluator did not return a final answer. The individual model
                            scores below still stand — or run the prompt again.
                        </p>
                    </div>
                ) : (
                    <p className="whitespace-pre-wrap text-base leading-relaxed lg:text-lg">
                        {finalResponse}
                    </p>
                )}

                {contributors.length > 0 && (
                    <div className="mt-7 flex flex-wrap items-center gap-3 border-t-2 border-white/20 pt-5">
                        <span className="bauhaus-label text-white/50">Merged from</span>

                        {contributors.map((id) => {
                            const model = MODELS.find((m) => m.id === id);
                            if (!model) return null;

                            return (
                                <span
                                    key={id}
                                    className="inline-flex items-center gap-2 border-2 border-white/30 px-3 py-1"
                                >
                                    <ShapeDecor
                                        shape={model.shapeName}
                                        color={model.color}
                                        size={14}
                                    />
                                    <span className="bauhaus-label">{model.label}</span>
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.section>
    );
}
