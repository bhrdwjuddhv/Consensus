import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { loadHistory, saveHistory, clearHistory } from "../lib/history.js";

/**
 * Chat history, in React state and mirrored to localStorage.
 *
 * Newest-first. No Redux, no extra libs.
 */
const RunsContext = createContext(null);

export function RunsProvider({ children }) {
    // Lazy initialiser: read localStorage once on mount, not on every render.
    const [runs, setRuns] = useState(loadHistory);

    // Mirror to localStorage whenever history changes. saveHistory swallows quota
    // and private-mode failures, so a storage problem can never break a run.
    useEffect(() => {
        saveHistory(runs);
    }, [runs]);

    const value = useMemo(
        () => ({
            runs,

            /** Only ever called on a successful run — failures are not recorded. */
            addRun: (result) =>
                setRuns((previous) => [
                    {
                        id: crypto.randomUUID(),
                        createdAt: Date.now(),
                        prompt: result.prompt,
                        result,
                    },
                    ...previous,
                ]),

            clearRuns: () => {
                clearHistory();
                setRuns([]);
            },
        }),
        [runs],
    );

    return <RunsContext.Provider value={value}>{children}</RunsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- the hook belongs with its context
export function useRuns() {
    const context = useContext(RunsContext);

    if (!context) {
        throw new Error("useRuns must be used inside a RunsProvider");
    }

    return context;
}
