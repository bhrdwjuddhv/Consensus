import Anthropic from "@anthropic-ai/sdk";
import { anthropicApiKey, ANSWER_SYSTEM_PROMPT } from "../../constants.js";

const client = new Anthropic({
    apiKey: anthropicApiKey,
    timeout: 30_000,
    maxRetries: 2,
});

/** @throws on failure — isolated by Promise.allSettled in the caller. */
const useClaude = async (messages) => {
    const message = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system: ANSWER_SYSTEM_PROMPT,
        messages,
    });

    // A response can hold several text blocks; take all of them, not just the first.
    const text = message.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("")
        .trim();

    if (!text) throw new Error("Claude returned an empty response");

    return text;
};

export { useClaude };
