import rateLimit from "express-rate-limit";

import { rateLimitWindowMs, rateLimitMax } from "../constants.js";


const aiRateLimiter = rateLimit({
    windowMs: rateLimitWindowMs,
    limit: rateLimitMax,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (_req, res) => {
        const retryAfterSeconds = Math.ceil(rateLimitWindowMs / 1000);

        res.status(429).json({
            success: false,
            statusCode: 429,
            message: `Too many requests. Limit is ${rateLimitMax} request(s) per ${retryAfterSeconds} seconds.`,
            errors: { retryAfterSeconds },
        });
    },
});

export { aiRateLimiter };
