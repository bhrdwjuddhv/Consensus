import { ArrowRight, Trash2 } from "lucide-react";

import Button from "../components/Button.jsx";
import ShapeDecor from "../components/ShapeDecor.jsx";
import StatusPill from "../components/StatusPill.jsx";
import { MODELS } from "../lib/models.js";
import { CONTEXT_CHATS } from "../lib/history.js";
import { useRuns } from "../context/RunsContext.jsx";

const formatTime = (ms) =>
    new Date(ms).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

export default function History() {
    const { runs, clearRuns } = useRuns();

    if (runs.length === 0) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-20 lg:px-8">
                <div className="border-2 lg:border-4 border-ink bg-white p-10 text-center shadow-[8px_8px_0px_0px_#121212] lg:p-16">
                    <div className="flex justify-center gap-2">
                        <ShapeDecor shape="circle" color="#D02020" size={28} />
                        <ShapeDecor shape="square" color="#1040C0" size={28} />
                        <ShapeDecor shape="triangle" color="#F0C020" size={28} />
                    </div>

                    <h1 className="bauhaus-display mt-8 text-3xl lg:text-5xl">Nothing here yet</h1>

                    <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink/70">
                        Your chats are saved in this browser and appear here. The last{" "}
                        {CONTEXT_CHATS} are replayed as context, so follow-up questions work. Ask
                        something in the studio and watch three models disagree.
                    </p>

                    <div className="mt-9 flex justify-center">
                        <Button as="link" to="/studio" size="lg" variant="primary">
                            Open the studio
                            <ArrowRight size={18} strokeWidth={3} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="bauhaus-display text-4xl sm:text-6xl">History</h1>
                    <p className="mt-3 text-ink/70">
                        {runs.length} chat{runs.length === 1 ? "" : "s"}, saved in this browser. The
                        last {CONTEXT_CHATS} are sent as context with every new prompt.
                    </p>
                </div>

                <Button variant="ghost" size="sm" onClick={clearRuns}>
                    <Trash2 size={14} strokeWidth={3} />
                    Clear history
                </Button>
            </header>

            <ul className="space-y-6">
                {runs.map(({ id, createdAt, result }) => {
                    const answered = MODELS.filter((model) => result.scores?.[model.id]);

                    return (
                        <li
                            key={id}
                            className="bauhaus-card p-6 transition-transform duration-200 ease-out hover:-translate-y-1"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <p className="max-w-xl grow text-lg font-bold leading-snug">
                                    {result.prompt}
                                </p>

                                <span className="bauhaus-label shrink-0 text-ink/50">
                                    {formatTime(createdAt)}
                                </span>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-3 border-t-2 border-ink/15 pt-4">
                                {MODELS.map((model) => {
                                    const ok = Boolean(result.scores?.[model.id]);

                                    return (
                                        <span
                                            key={model.id}
                                            className={`inline-flex items-center gap-2 border-2 border-ink px-2 py-1
                                  ${ok ? "bg-white" : "bg-muted opacity-50"}`}
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

                                <StatusPill tone={result.finalResponse ? "ok" : "error"}>
                                    {result.finalResponse
                                        ? `Merged ${answered.length}`
                                        : "No synthesis"}
                                </StatusPill>
                            </div>

                            {result.finalResponse && (
                                <p className="mt-5 line-clamp-3 whitespace-pre-wrap text-sm leading-relaxed text-ink/70">
                                    {result.finalResponse}
                                </p>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
