import { motion } from "motion/react";

/**
 * Skeleton bars. Deliberately blocky — a Bauhaus skeleton is just rectangles of
 * the muted token, never a shimmer gradient.
 */
export function SkeletonLines({ lines = 3 }) {
    const widths = ["100%", "92%", "78%", "85%", "64%"];

    return (
        <div className="space-y-2" aria-hidden="true">
            {Array.from({ length: lines }).map((_, i) => (
                <motion.div
                    key={i}
                    className="h-3 bg-muted border-2 border-ink/10"
                    style={{ width: widths[i % widths.length] }}
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
}

export default function LoadingState({ label = "Working" }) {
    return (
        <div role="status" aria-live="polite" className="bauhaus-card p-6">
            <span className="bauhaus-label">{label}</span>
            <div className="mt-4">
                <SkeletonLines lines={4} />
            </div>
        </div>
    );
}
