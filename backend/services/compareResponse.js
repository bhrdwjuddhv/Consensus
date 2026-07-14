import { evaluateResponse } from "./ai-integration/index.js";


const compareResponsesFromAllAiModels = async (responses, question) => {
    const answers = responses
        
        .map(({ model, response }) => `<answer model="${model}">\n${response}\n</answer>`)
        .join("\n\n");

    const userPrompt = [
        "Here is the original question:",
        `<question>\n${question}\n</question>`,
        "",
        `Here are the answers from ${responses.length} model(s):`,
        answers,
        "",
        "Score each model that appears above, then write the best possible final answer.",
    ].join("\n");

    return evaluateResponse(userPrompt);
};

export { compareResponsesFromAllAiModels };
