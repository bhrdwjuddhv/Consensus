import OpenAI from "openai";
import { ANSWER_SYSTEM_PROMPT, openAiApiKey } from "../../constants.js";

const client = new OpenAI({
    apiKey: openAiApiKey,
    timeout: 30_000,
    maxRetries: 2,
});


const useOpenAI = async (messages) => {
    const response = await client.responses.create({
        model: "gpt-4o-mini",
        instructions: ANSWER_SYSTEM_PROMPT,
        input: messages,
    });

    const text = response.output_text?.trim();
    if (!text) throw new Error("OpenAI returned an empty response");

    return text;
};

export { useOpenAI };
