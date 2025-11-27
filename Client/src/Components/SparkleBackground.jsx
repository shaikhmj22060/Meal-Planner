import { motion } from "motion/react";
import React from "react";

export default function SparkleBackground({ count = 16 }) {
  return (
    <motion.div className="absolute inset-0 -z-50 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = 5 + Math.random() * 8;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(
                ${600 + Math.random() * 60},
                ${140 + Math.random() * 60},
                ${100 + Math.random() * 80},
                ${0.8 + Math.random() * 0.8}
              )`,
              filter: "blur(3px)",
            }}
            animate={{
              opacity: [0.8, 0.4, 0.3],
              y: [-10, 10, -10],
              x: [-5, 6, -5],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        );
      })}
    </motion.div>
  );
}
