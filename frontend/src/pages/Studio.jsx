import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import PromptConsole from "../components/PromptConsole.jsx";
import ProcessTimeline from "../components/ProcessTimeline.jsx";
import ModelScoreCard from "../components/ModelScoreCard.jsx";
import SummaryStrip from "../components/SummaryStrip.jsx";
import FinalAnswer from "../components/FinalAnswer.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { MODELS, getModel } from "../lib/models.js";
import { runConsensus, didAnswer } from "../lib/api.js";
import { useRuns } from "../context/RunsContext.jsx";

/**
 * The ordered process. Model stages carry their provider so the row can show the
 * right shape and colour.
 */
const buildStages = () => [
    { key: "dispatch", label: "Dispatching prompt", state: "pending", model: null },
    ...MODELS.map((model) => ({
        key: model.id,
        label: `${model.label} answering`,
        state: "pending",
        model,
    })),
    { key: "evaluate", label: "Evaluating & scoring", state: "pending", model: getModel("claude") },
    { key: "render", label: "Rendering result", state: "pending", model: null },
];

/**
 * Client-side progression while the request is in flight.
 *
 * The backend returns a single JSON payload (BACKEND_STREAMS_STAGES === false), so
 * there are no real stage events to drive this. Rows therefore only ever advance to
 * *active* here — never to done or failed. Those come exclusively from the real
 * response, reconciled against which keys are actually present in `scores`.
 */
const PROGRESSION = [
    { at: 400, key: "openai" },
    { at: 1100, key: "claude" },
    { at: 1800, key: "gemini" },
    { at: 2800, key: "evaluate" },
];

export default function Studio() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState("idle"); // idle | running | done | error
    const [error, setError] = useState(null);
    const [stages, setStages] = useState(buildStages);

    const { getToken } = useAuth();
    const { runs, addRun } = useRuns();

    const timers = useRef([]);

    const clearTimers = () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    };

    useEffect(() => clearTimers, []);

    const setStage = (key, state) =>
        setStages((current) =>
            current.map((stage) => (stage.key === key ? { ...stage, state } : stage)),
        );

    const isRunning = status === "running";

    const handleRun = async () => {
        clearTimers();
        setStatus("running");
        setError(null);
        setResult(null);
        setStages(buildStages());

        // Stages light up as *active* on a timer. Nothing is claimed finished.
        PROGRESSION.forEach(({ at, key }) => {
            timers.current.push(setTimeout(() => setStage(key, "active"), at));
        });

        try {
            const consensus = await runConsensus({
                prompt,
                // The last 5 chats are replayed to the models as context.
                history: runs,
                getToken,
                onStage: (stage) => {
                    if (stage === "dispatch") setStage("dispatch", "active");
                    // The prompt is genuinely sent by the time the fetch is in flight.
                    if (stage === "received") setStage("dispatch", "done");
                },
            });

            clearTimers();

            // Reconcile against the real payload: a model that returned an answer
            // answered. Keyed off `answers`, never `scores` — see didAnswer.
            setStages((current) =>
                current.map((stage) => {
                    if (stage.key === "dispatch") return { ...stage, state: "done" };

                    if (MODELS.some((m) => m.id === stage.key)) {
                        return {
                            ...stage,
                            state: didAnswer(consensus, stage.key) ? "done" : "failed",
                        };
                    }

                    if (stage.key === "evaluate") {
                        return { ...stage, state: consensus.finalResponse ? "done" : "failed" };
                    }

                    return { ...stage, state: "done" }; // render
                }),
            );

            setResult(consensus);
            setStatus("done");
            addRun(consensus);
        } catch (err) {
            clearTimers();

            // Whatever was mid-flight is now a failure; anything still pending never ran.
            setStages((current) =>
                current.map((stage) =>
                    stage.state === "active" ? { ...stage, state: "failed" } : stage,
                ),
            );

            setError(err.message);
            setStatus("error");
        }
    };

    const handleReset = () => {
        clearTimers();
        setPrompt("");
        setResult(null);
        setError(null);
        setStages(buildStages());
        setStatus("idle");
    };

    const answered = MODELS.filter((model) => didAnswer(result, model.id)).map(({ id }) => id);

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-16">
            <header className="mb-8">
                <h1 className="bauhaus-display text-4xl sm:text-6xl">Studio</h1>

                <p className="mt-3 max-w-xl text-lg text-ink/70">
                    One prompt. Three models answer independently. An evaluator scores them and
                    merges the strongest parts into a single answer.
                </p>
            </header>

            <PromptConsole
                value={prompt}
                onChange={setPrompt}
                onRun={handleRun}
                onReset={handleReset}
                isRunning={isRunning}
                hasResult={status === "done" || status === "error"}
            />

            {status !== "idle" && (
                <div className="mt-12">
                    <ProcessTimeline stages={stages} />
                </div>
            )}

            {status === "error" && (
                <div className="mt-10">
                    <ErrorState message={error} onRetry={handleRun} />
                </div>
            )}

            {status === "done" && result && (
                <>
                    <div className="mt-12 flex items-center gap-4">
                        <h2 className="bauhaus-label shrink-0">Final answer</h2>
                        <span aria-hidden="true" className="h-1 grow bg-ink" />
                    </div>

                    <div className="mt-6">
                        <FinalAnswer
                            finalResponse={result.finalResponse}
                            contributors={answered}
                        />
                    </div>

                    {result.summary && (
                        <div className="mt-12">
                            <div className="mb-6 flex items-center gap-4">
                                <h2 className="bauhaus-label shrink-0">Verdict</h2>
                                <span aria-hidden="true" className="h-1 grow bg-ink" />
                            </div>

                            <SummaryStrip summary={result.summary} />
                        </div>
                    )}

                    <div className="mt-12 flex items-center gap-4">
                        <h2 className="bauhaus-label shrink-0">Scores</h2>
                        <span aria-hidden="true" className="h-1 grow bg-ink" />
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-3 lg:gap-8">
                        {MODELS.map((model, index) => (
                            <ModelScoreCard
                                key={model.id}
                                model={model}
                                score={result.scores?.[model.id]}
                                answer={result.answers?.[model.id]}
                                answered={didAnswer(result, model.id)}
                                index={index}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
