import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";
import { getResponsesFromAllAiModels, compareResponsesFromAllAiModels } from "../services/index.js";

const getResponse = asyncHandler(async (req, res) => {
    const { messageArray,question } = req.body;

    const responses = await getResponsesFromAllAiModels(messageArray);


    const evaluation = await compareResponsesFromAllAiModels(responses, question);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                ...evaluation,
                providersUsed: responses.map(({ model }) => model),
            },
            "Response fetched successfully",
        ),
    );
});

export { getResponse};
