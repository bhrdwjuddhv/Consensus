import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

import { anthropicApiKey, EVALUATION_SYSTEM_PROMPT } from "../../constants.js";
import { EvaluationSchema } from "../../schemas.js";
import { ApiError } from "../../utils/index.js";

const client = new Anthropic({
    apiKey: anthropicApiKey,
    timeout: 30_000,
    maxRetries: 2,
});

/**
 * Judge the collected answers and synthesise a final one.
 *
 * `messages.parse` enforces the schema, so malformed or schema-violating model
 * JSON throws rather than flowing downstream.
 *
 * @throws {ApiError} 502 when the model returns nothing usable. NOT caught here:
 * a swallowed error here previously returned `undefined`, which the controller
 * spread into an empty object and served as `200` with no `finalResponse` — a
 * failed synthesis was indistinguishable from a successful one.
 */
const evaluateResponse = async (userPrompt) => {
    const message = await client.messages.parse({
        model: "claude-haiku-4-5",
        max_tokens: 2048,
        system: EVALUATION_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
        output_config: { format: zodOutputFormat(EvaluationSchema) },
    });

    if (!message.parsed_output) {
        throw new ApiError(502, "The evaluation model returned an unusable response", {
            stopReason: message.stop_reason,
        });
    }

    return message.parsed_output;
};

export { evaluateResponse };
