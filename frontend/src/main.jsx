import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import "./index.css";
import { router } from "./App.jsx";
import { RunsProvider } from "./context/RunsContext.jsx";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const root = createRoot(document.getElementById("root"));

// Clerk throws an opaque error when the key is absent. Say what's actually wrong.
if (!publishableKey) {
    root.render(
        <div className="mx-auto max-w-xl p-12">
            <h1 className="bauhaus-display text-3xl">Missing Clerk key</h1>
            <p className="mt-4 leading-relaxed">
                Set <code className="bg-yellow px-1">VITE_CLERK_PUBLISHABLE_KEY</code> in{" "}
                <code className="bg-yellow px-1">frontend/.env</code>. Copy{" "}
                <code className="bg-yellow px-1">.env.example</code> and see CONNECTIONS.md.
            </p>
        </div>,
    );
} else {
    root.render(
        <StrictMode>
            <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
                <RunsProvider>
                    <RouterProvider router={router} />
                </RunsProvider>
            </ClerkProvider>
        </StrictMode>,
    );
}
