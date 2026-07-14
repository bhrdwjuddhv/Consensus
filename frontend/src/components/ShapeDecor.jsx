/**
 * The small geometric corner shape every card carries. Decorative only.
 *
 * `shape` is "circle" | "square" | "triangle" — which ties the card back to its
 * provider without needing a label.
 */
export default function ShapeDecor({ shape = "circle", color = "#D02020", size = 20, className = "" }) {
    const common = { stroke: "#121212", strokeWidth: 3 };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            {shape === "circle" && <circle cx="12" cy="12" r="10" fill={color} {...common} />}
            {shape === "square" && <rect x="2" y="2" width="20" height="20" fill={color} {...common} />}
            {shape === "triangle" && <polygon points="12,2 23,21 1,21" fill={color} {...common} />}
        </svg>
    );
}
