import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Protected from "./components/Protected.jsx";
import Landing from "./pages/Landing.jsx";
import Studio from "./pages/Studio.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import History from "./pages/History.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            // Public
            { path: "/", element: <Landing /> },
            { path: "/how-it-works", element: <HowItWorks /> },

            // Clerk's <SignIn routing="path">
            { path: "/sign-in/*", element: <SignInPage /> },
            { path: "/sign-up/*", element: <SignUpPage /> },

            // Protected
            {
                path: "/studio",
                element: (
                    <Protected>
                        <Studio />
                    </Protected>
                ),
            },
            {
                path: "/history",
                element: (
                    <Protected>
                        <History />
                    </Protected>
                ),
            },

            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
]);
