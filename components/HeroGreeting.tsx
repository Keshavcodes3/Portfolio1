import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { site } from "@/config/site";

const greetings=site.tldr

export function HeroGreeting() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % greetings.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-mono text-sm text-accent"
                >
                    {greetings[index]}
                    <span className="ml-1 inline-block w-[2px] animate-blink bg-accent">
                        &nbsp;
                    </span>
                </motion.p>
            </AnimatePresence>
        </div>
    );
}