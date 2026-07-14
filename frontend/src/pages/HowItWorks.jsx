import { ArrowRight } from "lucide-react";

import Button from "../components/Button.jsx";
import ShapeDecor from "../components/ShapeDecor.jsx";
import { MODELS } from "../lib/models.js";

/**
 * Order matters here, so this is a real ordered list with real sequence numbers —
 * not divs that happen to look numbered.
 */
const STEPS = [
    {
        title: "You write one prompt",
        body: "A single question enters the studio. You never pick a model.",
        accent: "bg-canvas",
    },
    {
        title: "It fans out to three models",
        body: "OpenAI, Claude and Gemini receive the identical prompt and run concurrently — not one after another. Three independent attempts at the same question.",
        accent: "bg-red text-white",
    },
    {
        title: "Answers are collected",
        body: "Every answer that comes back is kept, along with how long it took. If one provider fails or times out, the run continues with the survivors rather than collapsing.",
        accent: "bg-canvas",
    },
    {
        title: "An evaluator compares them",
        body: "A fourth model reads all the answers side by side and scores each on accuracy, reasoning and clarity — it sees every response, not just one.",
        accent: "bg-blue text-white",
    },
    {
        title: "You get one synthesized answer",
        body: "The evaluator merges the strongest parts into a single answer, and tells you what it took from where. Where the models disagreed, that disagreement is the signal.",
        accent: "bg-yellow text-ink",
    },
];

export default function HowItWorks() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-20">
            <header>
                <h1 className="bauhaus-display text-4xl sm:text-6xl lg:text-7xl">How it works</h1>

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
                    One model can be confidently wrong and you'd never know. Three models being
                    wrong the same way is far less likely — and where they diverge is exactly where
                    you should look.
                </p>
            </header>

            <div className="mt-10 flex flex-wrap items-center gap-4 border-y-4 border-ink py-5">
                {MODELS.map(({ id, label, shapeName, color, colorName }) => (
                    <div key={id} className="flex items-center gap-2">
                        <ShapeDecor shape={shapeName} color={color} size={20} />
                        <span className="bauhaus-label">
                            {label} — {shapeName} / {colorName}
                        </span>
                    </div>
                ))}
            </div>

            <ol className="mt-12 space-y-8">
                {STEPS.map(({ title, body, accent }, i) => (
                    <li key={title} className="flex gap-5 lg:gap-8">
                        <div className="flex shrink-0 flex-col items-center">
                            <span
                                className="flex h-14 w-14 items-center justify-center border-2 lg:border-4
                           border-ink bg-ink text-white bauhaus-display text-2xl
                           shadow-[4px_4px_0px_0px_#121212]"
                            >
                                {i + 1}
                            </span>

                            {i < STEPS.length - 1 && (
                                <span aria-hidden="true" className="mt-2 w-1 grow bg-ink" />
                            )}
                        </div>

                        <div
                            className={`grow border-2 lg:border-4 border-ink p-6 lg:p-7
                          shadow-[4px_4px_0px_0px_#121212] lg:shadow-[6px_6px_0px_0px_#121212]
                          ${accent}`}
                        >
                            <h2 className="bauhaus-display text-2xl lg:text-3xl">{title}</h2>
                            <p className="mt-3 leading-relaxed opacity-90">{body}</p>
                        </div>
                    </li>
                ))}
            </ol>

            <div className="mt-14 flex justify-center">
                <Button as="link" to="/studio" size="lg" variant="primary">
                    Try it
                    <ArrowRight size={18} strokeWidth={3} />
                </Button>
            </div>
        </div>
    );
}
