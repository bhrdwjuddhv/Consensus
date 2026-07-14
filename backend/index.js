import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";

import { port, corsOrigin, trustProxyHops } from "./constants.js";
import aiRouter from "./routes/ai.routes.js";
import { ApiResponse } from "./utils/index.js";

const app = express();


app.set("trust proxy", trustProxyHops);

app.use(helmet());


const allowedOrigins = [corsOrigin, "http://localhost:5173", "http://127.0.0.1:5173"].filter(
    Boolean,
);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(hpp({ checkQuery: false }));


app.get("/health", (_req, res) => {
    res.status(200).json(new ApiResponse(200, { uptime: process.uptime() }, "OK"));
});

app.use("/api/v1/get-answer", aiRouter);

const server = app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
});

export { app, server };
