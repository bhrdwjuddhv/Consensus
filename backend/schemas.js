import { z } from "zod";

const ModelEvaluationSchema = z.object({
    accuracy: z.number().min(0).max(10),
    reasoning: z.number().min(0).max(10),
    clarity: z.number().min(0).max(10),
    overall: z.number().min(0).max(10),

    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
});

const EvaluationSchema = z.object({
    finalResponse: z.string(),

    summary: z.object({
        bestReasoning: z.enum(["openai", "claude", "gemini"]),
        bestAccuracy: z.enum(["openai", "claude", "gemini"]),
        bestClarity: z.enum(["openai", "claude", "gemini"]),

        synthesis: z.string(),
    }),

    scores: z.object({
        openai: ModelEvaluationSchema.optional(),
        claude: ModelEvaluationSchema.optional(),
        gemini: ModelEvaluationSchema.optional(),
    }),
});

export { ModelEvaluationSchema, EvaluationSchema };
