/**
 * Circle + square + triangle in the three primaries — the three models, and the
 * mark for the app itself.
 */
export default function GeometricLogo({ size = 32, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            className={className}
            role="img"
            aria-label="Consensus"
        >
            <circle cx="14" cy="14" r="12" fill="#D02020" stroke="#121212" strokeWidth="3" />
            <rect x="22" y="22" width="24" height="24" fill="#1040C0" stroke="#121212" strokeWidth="3" />
            <polygon points="36,2 48,20 24,20" fill="#F0C020" stroke="#121212" strokeWidth="3" />
        </svg>
    );
}
