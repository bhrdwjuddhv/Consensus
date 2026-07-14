const STORAGE_KEY = "consensus.history.v1";

const MAX_STORED = 50;

export const CONTEXT_CHATS = 5;

export function loadHistory() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveHistory(entries) {
    const capped = entries.slice(0, MAX_STORED);

    // Entries carry full model answers and can be large. If the quota rejects the
    // full set, retry with just the few most recent before giving up.
    for (const attempt of [capped, capped.slice(0, CONTEXT_CHATS)]) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(attempt));
            return true;
        } catch {
            continue;
        }
    }

    // Storage unavailable (quota, private mode, disabled). The app keeps working;
    // history just won't survive a reload.
    return false;
}

export function clearHistory() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch {
        return false;
    }
}

/**
 * Turn history into the `messageArray` the backend already reads:
 * a flat [{ role: "user" | "assistant", content }] conversation.
 *
 * Last CONTEXT_CHATS chats, oldest -> newest, each replayed as the user's prompt
 * followed by the synthesized answer, then the new prompt appended last.
 *
 * Runs with no finalResponse are skipped: there is no assistant turn to replay,
 * and the providers reject empty content.
 *
 * @param {Array} history newest-first
 * @param {string} prompt the current prompt
 */
export function buildMessageArray(history, prompt) {
    const usable = history
        .filter((entry) => entry?.prompt && entry?.result?.finalResponse)
        .slice(0, CONTEXT_CHATS)
        .reverse();

    const messages = [];

    for (const entry of usable) {
        messages.push({ role: "user", content: entry.prompt });
        messages.push({ role: "assistant", content: entry.result.finalResponse });
    }

    messages.push({ role: "user", content: prompt });

    return messages;
}
