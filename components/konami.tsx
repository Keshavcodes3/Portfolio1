"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SEQUENCES = [
  [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ],
  ["k", "e", "s", "h", "a", "v"],
];

/**
 * A small reward for the curious: the Konami code rains a little confetti
 * and flips a hidden "achievement". Moderate, tasteful gamification.
 */
export function Konami() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let positions = SEQUENCES.map(() => 0);
    const onKey = (e: KeyboardEvent) => {
      // Ignore modifier keys so they don't break/reset the sequence
      if (["Shift", "Control", "Alt", "Meta", "CapsLock"].includes(e.key)) {
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      let hasUnlocked = false;
      positions = positions.map((pos, i) => {
        const seq = SEQUENCES[i];
        if (key === seq[pos]) {
          pos++;
          if (pos === seq.length) {
            hasUnlocked = true;
            return 0;
          }
          return pos;
        } else {
          return key === seq[0] ? 1 : 0;
        }
      });

      if (hasUnlocked) {
        setUnlocked(true);
        positions = SEQUENCES.map(() => 0);
        setTimeout(() => setUnlocked(false), 5000); // Extended slightly to match the longer animation path
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pieces = Array.from({ length: 50 }); // Bumped up slightly for a richer burst density

  return (
    <AnimatePresence>
      {unlocked && (
        <>
          <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            {pieces.map((_, i) => {
              // Calculate deterministic random tracks for physics variety
              const angle = (i * 7.2) * (Math.PI / 180); // Spread across a hemisphere
              const velocity = 300 + (i * 13) % 250;     // Varied initial explosion force

              // Keyframe calculations for physics arc simulation
              const initialX = window.innerWidth / 2;
              const initialY = window.innerHeight + 20;

              const targetX = Math.cos(angle) * velocity;
              const targetY = -window.innerHeight * 0.6 - ((i * 23) % 150); // Peak height
              const finalY = window.innerHeight + 100; // Falling past screen bottom

              const hue = (i * 47) % 360;
              const duration = 2.5 + (i % 4) * 0.3;

              return (
                <motion.span
                  key={i}
                  initial={{
                    x: initialX,
                    y: initialY,
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{
                    // Shoots outward horizontally, then sways slightly
                    x: [initialX, initialX + targetX, initialX + targetX + (i % 2 === 0 ? 40 : -40)],
                    // Shoots up to peak height, then drops hard under gravity
                    y: [initialY, initialY + targetY, finalY],
                    scale: [0, 1, 1, 0],
                    rotate: [0, 360, 1080],
                  }}
                  transition={{
                    duration: duration,
                    delay: (i % 8) * 0.02, // Tight cascade delay for explosion feel
                    ease: ["easeOut", "pacing", "easeIn"], // Fast launch, slow transition at apex, rapid drop
                  }}
                  style={{
                    background: `hsl(${hue} 90% 60%)`,
                  }}
                  className="absolute top-0 h-2.5 w-2.5 rounded-sm shadow-sm"
                />
              );
            })}
          </div>
          <motion.div
            initial={{ y: 50, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 30, x: "-50%", opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[101] rounded-full border bg-surface/90 px-5 py-2.5 text-sm font-medium shadow-xl backdrop-blur-xl"
          >
            🏆 Achievement unlocked — <span className="text-accent">you found the secret</span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}