import { MODELS } from "../lib/models.js";
import GeometricLogo from "./GeometricLogo.jsx";
import ShapeDecor from "./ShapeDecor.jsx";

export default function Footer() {
    return (
        <footer className="border-t-4 border-ink bg-ink text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
                <div className="max-w-sm">
                    <div className="flex items-center gap-3">
                        <GeometricLogo size={32} />
                        <span className="bauhaus-display text-2xl">Consensus</span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                        Three models answer. One evaluator keeps the strongest parts. You get a
                        single answer.
                    </p>
                </div>

                <div>
                    <h3 className="bauhaus-label text-white/50">The three</h3>

                    <ul className="mt-4 space-y-3">
                        {MODELS.map(({ id, label, model, shapeName, color }) => (
                            <li key={id} className="flex items-center gap-3">
                                <ShapeDecor shape={shapeName} color={color} size={18} />
                                <span className="font-bold">{label}</span>
                                <span className="text-sm text-white/50">{model}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t-2 border-white/20">
                <div className="mx-auto max-w-6xl px-4 py-4 lg:px-8">
                    <p className="bauhaus-label text-white/40">Self-consistency GenAI</p>
                </div>
            </div>
        </footer>
    );
}
