import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";
import { getResponsesFromAllAiModels, compareResponsesFromAllAiModels } from "../services/index.js";

const getResponse = asyncHandler(async (req, res) => {
    const { messageArray,question } = req.body;

    const responses = await getResponsesFromAllAiModels(messageArray);


    const evaluation = await compareResponsesFromAllAiModels(responses, question);

    // The raw answers, keyed by model. `responses` only contains providers that
    // succeeded, so a failed provider is simply absent — same convention `scores`
    // already uses.
    const answers = Object.fromEntries(responses.map(({ model, response }) => [model, response]));

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                ...evaluation,
                answers,
                providersUsed: responses.map(({ model }) => model),
            },
            "Response fetched successfully",
        ),
    );
});

export { getResponse};
