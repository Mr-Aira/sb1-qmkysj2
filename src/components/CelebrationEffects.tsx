import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export const CelebrationEffects = () => {
  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Create multiple bursts
    const end = Date.now() + 1000;
    const colors = ['#9333ea', '#6366f1', '#ec4899'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Falling stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 10,
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Glowing constellations */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-full h-full">
          <pattern
            id="constellation"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="1" fill="white" />
            <circle cx="30" cy="30" r="1" fill="white" />
            <circle cx="70" cy="70" r="1" fill="white" />
            <line
              x1="50"
              y1="50"
              x2="30"
              y2="30"
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            <line
              x1="50"
              y1="50"
              x2="70"
              y2="70"
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#constellation)" />
        </svg>
      </motion.div>
    </div>
  );
};