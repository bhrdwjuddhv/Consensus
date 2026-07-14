/**
 * Bauhaus design tokens.
 *
 * Tailwind v4 is CSS-first, so this legacy config is loaded explicitly from
 * src/index.css via `@config "../tailwind.config.js"`. Tokens live here so there
 * is exactly one source of truth.
 */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                canvas: "#F0F0F0",
                ink: "#121212",
                red: "#D02020",
                blue: "#1040C0",
                yellow: "#F0C020",
                muted: "#E0E0E0",
                cream: "#FFF9C4", // accordion-open only
            },
            fontFamily: {
                sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            boxShadow: {
                // Hard offset shadows. No blur, no spread, ever.
                hard: "4px 4px 0px 0px #121212",
                "hard-md": "6px 6px 0px 0px #121212",
                "hard-lg": "8px 8px 0px 0px #121212",
            },
            transitionTimingFunction: {
                // Mechanical, not organic.
                snap: "cubic-bezier(0.2, 0, 0, 1)",
            },
        },
    },
    plugins: [],
};
