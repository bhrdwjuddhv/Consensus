import { ArrowRight, Loader } from "lucide-react";

import Button from "./Button.jsx";
import { MODELS } from "../lib/models.js";
import ShapeDecor from "./ShapeDecor.jsx";

const MAX_LENGTH = 2000;

export default function PromptConsole({ value, onChange, onRun, onReset, isRunning, hasResult }) {
    const trimmed = value.trim();
    const isEmpty = trimmed === "";
    const tooLong = value.length > MAX_LENGTH;
    const canRun = !isEmpty && !tooLong && !isRunning;

    const handleKeyDown = (event) => {
        // Cmd/Ctrl+Enter runs, the way every console does.
        if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && canRun) {
            onRun();
        }
    };

    return (
        <section className="bauhaus-card p-5 lg:p-7">
            <div className="absolute -top-3 -left-3 hidden lg:block">
                <ShapeDecor shape="square" color="#1040C0" size={22} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="prompt" className="bauhaus-label">
                    Your prompt
                </label>

                <div className="flex items-center gap-2">
                    {MODELS.map(({ id, shapeName, color }) => (
                        <ShapeDecor key={id} shape={shapeName} color={color} size={16} />
                    ))}
                    <span className="bauhaus-label text-ink/50">Fans out to 3</span>
                </div>
            </div>

            <textarea
                id="prompt"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isRunning}
                rows={6}
                placeholder="Ask one question. It goes to all three models at once."
                aria-describedby="prompt-help"
                className="mt-4 w-full resize-y border-2 lg:border-4 border-ink bg-canvas p-4
                   font-medium text-base lg:text-lg rounded-none
                   placeholder:text-ink/40 disabled:opacity-50
                   focus:outline-none focus:bg-white transition-colors duration-200 ease-out"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <p
                    id="prompt-help"
                    className={`bauhaus-label ${tooLong ? "text-red" : "text-ink/50"}`}
                >
                    {tooLong
                        ? `${value.length} / ${MAX_LENGTH} — too long`
                        : `${value.length} / ${MAX_LENGTH}`}
                </p>

                <div className="flex items-center gap-3">
                    {hasResult && !isRunning && (
                        <Button variant="ghost" size="md" onClick={onReset}>
                            New prompt
                        </Button>
                    )}

                    <Button variant="primary" size="md" onClick={onRun} disabled={!canRun}>
                        {isRunning ? (
                            <>
                                <Loader size={16} strokeWidth={3} className="animate-spin" />
                                Running
                            </>
                        ) : (
                            <>
                                {hasResult ? "Run again" : "Run"}
                                <ArrowRight size={16} strokeWidth={3} />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </section>
    );
}
