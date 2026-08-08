import type { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "blue" | "green" | "purple" | "red" | "yellow";
}

function Badge({
    children,
    variant = "blue",
}: BadgeProps) {
    const baseStyle =
        "px-3 py-1 rounded-full text-sm font-medium";

    const variants = {
        blue: "bg-blue-100 text-blue-700",
        green: "bg-green-100 text-green-700",
        purple: "bg-purple-100 text-purple-700",
        red: "bg-red-100 text-red-700",
        yellow: "bg-yellow-100 text-yellow-700",
    };
    return (
        <span className={`${baseStyle} ${variants[variant]}`}>
            {children}
        </span>
    );
}

export default Badge;