"use client";
import { useRef, useState, useEffect } from "react";
import { Category } from "../lib/types";

function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.unobserve(entry.target); // reveal once
                }
            },
            { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.15, ...options }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [options]);

    return { ref, visible };
}

function CategoryCard({ category, idx }: { category: Category; idx: number }) {
    const { ref, visible } = useReveal<HTMLDivElement>();
    return (
        <div
            ref={ref}
            className={[
                "card p-6 group transform transition-all duration-700 ease-out",
                "hover:shadow-green hover:scale-[1.03] hover:-translate-y-2",
                // reveal: fade + slight rise; stagger with idx
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5",
            ].join(" ")}
            style={{ transitionDelay: `${Math.min(idx * 80, 240)}ms` }}
        >
            <div className="flex items-center mb-4">
                <h3
                    className="text-xl font-semibold transition-colors duration-300"
                    style={{ color: "hsl(var(--text-primary))" }}
                >
                    {category.name}
                </h3>
            </div>

            <div className="space-y-3">
                <p
                    style={{ color: "hsl(var(--text-secondary))" }}
                    className="transition-opacity duration-300"
                >
                    {category.description}
                </p>
                <button
                    className={[
                        "btn-primary",
                        "w-full py-2 rounded-lg transition-all duration-300",
                        "hover:shadow-lg active:scale-95",
                    ].join(" ")}
                >
                    Shop Now
                </button>
            </div>
        </div>
    );
}
export { CategoryCard };
