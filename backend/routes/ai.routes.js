import { Router } from "express";
import { clerkMiddleware, getAuth } from "@clerk/express";

import { getResponse } from "../controllers/ai.controller.js";
import { aiRateLimiter } from "../middlewares/rateLimiter.js";
import { ApiError } from "../utils/index.js";

const router = Router();

const requireUser = (req, _res, next) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return next(new ApiError(401, "Sign in to run a consensus"));
    }

    return next();
};

router
    .route("/get-and-evaluate-response")
    .post(clerkMiddleware(), requireUser, aiRateLimiter, getResponse);

export default router;
