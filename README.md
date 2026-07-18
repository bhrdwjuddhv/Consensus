# Consensus

A self-consistency answer engine. You ask one question, three different AI models answer it
independently, and a fourth model judges those answers and merges the strongest parts into a
single synthesized reply.

## UI-based

This is a web app, not a CLI. It has two parts:

- **Backend**: a Node/Express API that fans the prompt out to the providers, runs the
  evaluation, and returns one JSON payload.
- **Frontend**: a React + Vite app (Tailwind, motion, Clerk auth) with a Bauhaus-styled UI.
  You type a prompt in the Studio, watch a live process timeline, and see each model's raw
  answer, its scores, and the final synthesized answer.

## Models and providers

| Role | Provider | Model |
|------|----------|-------|
| Answer | OpenAI | gpt-4o-mini |
| Answer | Anthropic (Claude) | claude-haiku-4-5 |
| Answer | Google (Gemini) | gemini-3.5-flash |
| Evaluator / synthesizer | Anthropic (Claude) | claude-haiku-4-5 |

Gemini is called through Google's OpenAI-compatibility layer, so all three answer calls use a
similar chat-style interface. Claude plays two roles: it is one of the three answerers, and it
is also the judge that scores and synthesizes.

All provider API keys live only in the backend environment. They are never exposed to the
frontend or shipped in the browser bundle.

## How the self-consistency flow works

The idea is simple. One model can be confidently wrong and you would never know. Asking several
models the same question, then having a judge reconcile them, surfaces disagreement and keeps
the parts that hold up.

The flow, step by step:

1. **Dispatch.** The frontend builds a message array (the current prompt plus up to the last 5
   chats as context) and POSTs it to the backend consensus route.
2. **Fan out.** The backend sends the same prompt to OpenAI, Claude, and Gemini concurrently
   using `Promise.allSettled`. Because it is `allSettled` and not `all`, one provider failing or
   timing out does not sink the whole request. The survivors continue.
3. **Collect.** Every answer that comes back is kept. A provider that fails is simply left out,
   so the run degrades gracefully instead of crashing. If every provider fails, the request
   returns a 502.
4. **Evaluate.** All the collected answers, plus the original question, are handed to the Claude
   evaluator. It scores each answer that is present on accuracy, reasoning, and clarity, and it
   is told to only score models that actually appear in the input.
5. **Synthesize.** The evaluator writes one final answer that combines the strongest parts of
   each response, along with a short note on what it merged and which model was best at what.
6. **Render.** The backend returns one JSON object with `finalResponse`, `answers` (the raw
   per-model text), `summary`, and `scores`. The frontend shows the synthesized answer as the
   headline, with each model's own answer and scores below it.

The evaluator output is constrained by a schema, so the scores and summary always come back in a
predictable shape.

## Running it

Each side has its own setup. Copy the example env files, fill in the keys, and start both:

```bash
# backend
cd backend
cp .env.example .env   # add provider keys + Clerk keys
npm install
npm run dev            # http://localhost:3000

# frontend
cd frontend
cp .env.example .env   # add VITE_CLERK_PUBLISHABLE_KEY + VITE_API_BASE_URL
npm install
npm run dev            # http://localhost:5173
```

The consensus endpoint is protected by Clerk auth and rate limited to 2 requests per 24 hours
per IP.
