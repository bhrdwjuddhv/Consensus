import { Circle, Square, Triangle } from "lucide-react";


export const MODELS = [
    {
        id: "openai",
        label: "OpenAI",
        model: "gpt-4o-mini",
        Shape: Circle,
        shapeName: "circle",
        color: "#D02020",
        colorName: "red",
        bg: "bg-red",
        text: "text-red",
        border: "border-red",
    },
    {
        id: "claude",
        label: "Claude",
        model: "claude-haiku-4-5",
        Shape: Square,
        shapeName: "square",
        color: "#1040C0",
        colorName: "blue",
        bg: "bg-blue",
        text: "text-blue",
        border: "border-blue",
    },
    {
        id: "gemini",
        label: "Gemini",
        model: "gemini-2.5-flash",
        Shape: Triangle,
        shapeName: "triangle",
        color: "#F0C020",
        colorName: "yellow",
        bg: "bg-yellow",
        text: "text-yellow",
        border: "border-yellow",
    },
];

export const MODEL_BY_ID = Object.fromEntries(MODELS.map((m) => [m.id, m]));

export const getModel = (id) => MODEL_BY_ID[id] ?? MODELS[0];
