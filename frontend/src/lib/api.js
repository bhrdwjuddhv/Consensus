

import { buildMessageArray } from "./history.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const CONSENSUS_PATH = "/api/v1/get-answer/get-and-evaluate-response";

/**
 * Did this model actually answer? The single source of truth for done-vs-failed.
 *
 * Ground truth is `answers`: the backend builds it from the providers that really
 * responded. `scores` is the EVALUATOR's opinion — the schema leaves every model
 * optional and the judge is told to omit models it considers absent, so a model
 * that answered fine can be missing from `scores`. Deciding failure from `scores`
 * made a working provider render as failed.
 *
 * The `scores` fallback covers history saved before `answers` existed.
 */
export const didAnswer = (result, modelId) =>
    Boolean(result?.answers?.[modelId] ?? result?.scores?.[modelId]);

export const BACKEND_STREAMS_STAGES = false;


export async function runConsensus({ prompt, history = [], getToken, onStage, signal } = {}) {
    const trimmed = (prompt ?? "").trim();

    if (!trimmed) {
        throw new Error("Enter a prompt before running.");
    }

    if (!API_BASE_URL.trim()) {
        throw new Error("VITE_API_BASE_URL is not set. See CONNECTIONS.md.");
    }

    onStage?.("dispatch");

    const token = getToken ? await getToken() : null;

    const messageArray = buildMessageArray(history, trimmed);

    const response = await fetch(`${API_BASE_URL}${CONSENSUS_PATH}`, {
        method: "POST",
        signal,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },

        body: JSON.stringify({
            messageArray,
            question: trimmed,
        }),
    });


    const payload = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(payload?.message ?? `Request failed (${response.status})`);
    }

    onStage?.("received");

    const data = payload?.data ?? {};

    return {
        prompt: trimmed,
        finalResponse: data.finalResponse ?? null,
        summary: data.summary ?? null,
        scores: data.scores ?? {},
        // Raw per-model answers. A failed provider is absent, exactly like `scores`.
        // Defaults to {} so history saved before this key existed still renders.
        answers: data.answers ?? {},
    };
}
