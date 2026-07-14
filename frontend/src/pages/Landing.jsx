import { ArrowRight } from "lucide-react";

import Button from "../components/Button.jsx";
import ShapeDecor from "../components/ShapeDecor.jsx";
import { MODELS } from "../lib/models.js";

const STEPS = [
    { n: "01", title: "You ask once", body: "A single prompt enters the studio." },
    { n: "02", title: "Three answer", body: "OpenAI, Claude and Gemini run in parallel." },
    { n: "03", title: "One survives", body: "An evaluator keeps the strongest parts of each." },
];

export default function Landing() {
    return (
        <div>
            {/* Poster hero */}
            <section className="border-b-4 border-ink">
                <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-5 lg:gap-8 lg:px-8 lg:py-24">
                    <div className="lg:col-span-3">
                        <span className="bauhaus-label inline-block border-2 border-ink bg-yellow px-3 py-1">
                            Self-consistency
                        </span>

                        <h1 className="bauhaus-display mt-6 text-4xl sm:text-6xl lg:text-8xl">
                            Three models.
                            <br />
                            <span className="text-red">One</span>{" "}
                            <span className="text-blue">honest</span>
                            <br />
                            answer.
                        </h1>

                        <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/70 lg:text-xl">
                            Asking one model gives you one opinion. We ask three, then make a fourth
                            judge them — keeping what holds up and discarding what doesn't.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Button as="link" to="/studio" size="lg" variant="primary">
                                Launch the studio
                                <ArrowRight size={18} strokeWidth={3} />
                            </Button>

                            <Button as="link" to="/how-it-works" size="lg" variant="ghost">
                                How it works
                            </Button>
                        </div>
                    </div>

                    {/* Geometric composition, not decoration-for-its-own-sake:
              each block is one of the three models. */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex aspect-square items-center justify-center border-4 border-ink bg-red shadow-[8px_8px_0px_0px_#121212]">
                                <div className="h-20 w-20 rounded-full border-4 border-ink bg-canvas" />
                            </div>

                            <div className="flex aspect-square items-center justify-center border-4 border-ink bg-blue shadow-[8px_8px_0px_0px_#121212]">
                                <div className="h-20 w-20 border-4 border-ink bg-canvas" />
                            </div>

                            <div className="flex aspect-square items-center justify-center border-4 border-ink bg-yellow shadow-[8px_8px_0px_0px_#121212]">
                                <svg viewBox="0 0 100 100" className="h-20 w-20">
                                    <polygon
                                        points="50,8 94,92 6,92"
                                        fill="#F0F0F0"
                                        stroke="#121212"
                                        strokeWidth="8"
                                    />
                                </svg>
                            </div>

                            <div className="flex aspect-square flex-col items-center justify-center gap-1 border-4 border-ink bg-ink shadow-[8px_8px_0px_0px_#121212]">
                                <span className="bauhaus-label text-yellow">Final</span>
                                <div className="mt-2 flex items-center gap-1">
                                    {MODELS.map(({ id, shapeName, color }) => (
                                        <ShapeDecor
                                            key={id}
                                            shape={shapeName}
                                            color={color}
                                            size={22}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Color-blocked process strip */}
            <section className="border-b-4 border-ink">
                <div className="grid md:grid-cols-3">
                    {STEPS.map(({ n, title, body }, i) => (
                        <div
                            key={n}
                            className={[
                                "border-b-4 border-ink p-8 md:border-b-0 lg:p-12",
                                i < 2 ? "md:border-r-4" : "",
                                i === 0 ? "bg-red text-white" : "",
                                i === 1 ? "bg-blue text-white" : "",
                                i === 2 ? "bg-yellow text-ink" : "",
                            ].join(" ")}
                        >
                            <span className="bauhaus-display text-5xl lg:text-6xl">{n}</span>

                            <h2 className="bauhaus-display mt-5 text-2xl lg:text-3xl">{title}</h2>

                            <p
                                className={`mt-3 leading-relaxed ${
                                    i === 2 ? "text-ink/70" : "text-white/80"
                                }`}
                            >
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing CTA */}
            <section className="bg-canvas">
                <div className="mx-auto max-w-6xl px-4 py-16 text-center lg:px-8 lg:py-24">
                    <h2 className="bauhaus-display text-3xl sm:text-5xl lg:text-6xl">
                        Stop trusting
                        <br />
                        one model.
                    </h2>

                    <div className="mt-10 flex justify-center">
                        <Button as="link" to="/studio" size="lg" variant="ink">
                            Run your first prompt
                            <ArrowRight size={18} strokeWidth={3} />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
