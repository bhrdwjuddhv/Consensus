import { useOpenAI, useClaude, useGemini } from "./ai-integration/index.js";
import { ApiError } from "../utils/index.js";

const PROVIDERS = [
    { model: "openai", call: useOpenAI },
    { model: "claude", call: useClaude },
    { model: "gemini", call: useGemini },
];

const getResponsesFromAllAiModels = async (messages) => {
    const settled = await Promise.allSettled(PROVIDERS.map(({ call }) => call(messages)));

    const succeeded = [];
    const failed = [];

    settled.forEach((result, index) => {
        const { model } = PROVIDERS[index];

        if (result.status === "fulfilled") {
            succeeded.push({ model, response: result.value });
        } else {
            failed.push(model);
        }
    });

    
    if (succeeded.length === 0) {
        throw new ApiError(502, "All AI providers failed to respond", { providers: failed });
    }

    return succeeded;
};

export { getResponsesFromAllAiModels };
