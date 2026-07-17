import OpenAI from "openai";
import { geminiApiKey, ANSWER_SYSTEM_PROMPT } from "../../constants.js";

// Gemini via the OpenAI-compatibility layer:
// https://ai.google.dev/gemini-api/docs/openai
//
// 60s, not the 30s the other two get: gemini-3.5-flash is a thinking model and is
// legitimately slower. A timed-out provider must reject (below), so it degrades to
// a failed card while the other two still synthesize.
const client = new OpenAI({
    apiKey: geminiApiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

/**
 * @throws on failure. Deliberately NOT caught: the caller uses Promise.allSettled,
 * which isolates a provider failure. Catching here returned `undefined`, which
 * allSettled reports as FULFILLED — so a dead provider was recorded as a success
 * whose answer was literally the string "undefined".
 */
const useGemini = async (messages) => {
    const response = await client.chat.completions.create({
        model: "gemini-3.5-flash",
        messages: [{ role: "system", content: ANSWER_SYSTEM_PROMPT }, ...messages],
    });

    const text = response.choices[0]?.message?.content?.trim();
    if (!text) throw new Error("Gemini returned an empty response");

    return text;
};

export { useGemini };
