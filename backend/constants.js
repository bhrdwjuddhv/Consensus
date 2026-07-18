import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT ?? 3000;
const corsOrigin = process.env.CORS_ORIGIN
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
const openAiApiKey = process.env.OPENAI_API_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;


const rateLimitWindowMs = Number(process.env.AI_RATE_LIMIT_WINDOW_MS) || 24 * 60 * 60 * 1000;
const rateLimitMax = Number(process.env.AI_RATE_LIMIT_MAX) || 2;


const trustProxyHops = Number(process.env.TRUST_PROXY_HOPS) || 1;



const ANSWER_SYSTEM_PROMPT = [
    "You are a precise, helpful assistant.",
    "Answer the user's question directly and accurately.",
    "Show your reasoning where it matters, and say plainly when you are unsure.",
    "Do not invent facts, citations, or sources.",
].join(" ");

const EVALUATION_SYSTEM_PROMPT = [
    "You are an impartial judge comparing answers from several AI models to the same question.",
    "Score each model that is present on accuracy, reasoning, and clarity from 0 to 10.",
    "Only score models that actually appear in the input; omit any model that is absent.",
    "Then synthesise the single best possible answer to the original question, drawing on the",
    "strongest parts of each response. Be strict and specific: do not award high scores by default.",
].join(" ");

export {
    ANSWER_SYSTEM_PROMPT,
    EVALUATION_SYSTEM_PROMPT,
    port,
    geminiApiKey,
    anthropicApiKey,
    openAiApiKey,
    corsOrigin,
    rateLimitWindowMs,
    rateLimitMax,
    trustProxyHops,
};
