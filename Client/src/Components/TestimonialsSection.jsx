import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Got a full recipe in just 2 seconds! Love how accurate it is.",
    author: "Aditi Sharma",
  },
  {
    text: "Better than watching long YouTube videos. Super clean and fast.",
    author: "Rohan Patel",
  },
  {
    text: "Insanely simple UI — it feels like magic every time I use it.",
    author: "Meera Desai",
  },
  {
    text: "The steps are so clear! Helped me cook my first dish.",
    author: "Karan Singh",
  },
  {
    text: "I use it every day now — my kitchen best friend!",
    author: "Neha Gupta",
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every ~2.5 seconds (1s pause + 1.5s scroll)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;

      const width = containerRef.current.children[0].offsetWidth + 24; // card width + gap
      const nextIndex = (currentIndex + 1) % testimonials.length;

      containerRef.current.scrollTo({
        left: nextIndex * width,
        behavior: "smooth",
      });

      setCurrentIndex(nextIndex);
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="relative py-24 px-6 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Loved by Home Chefs
        </motion.h2>

        <p className="text-gray-600 mt-3 mb-12 text-lg">
          Real users. Real reactions. Real delicious results.
        </p>

        {/* Fade Edges */}
        {/* <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-white to-transparent z-20"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-white to-transparent z-20"></div> */}

        {/* Horizontal Scroll Container */}
        <div
          ref={containerRef}
          className="
            flex gap-6 overflow-x-scroll   scroll-smooth px-2 scrollbar-hide"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                snap-center
                w-[90%] 
                md:w-[32%] 
                bg-white rounded-2xl p-6 shadow-input  relative shrink-0
                transition-all duration-300 
              "
            >
              {/* Floating Quote */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-4 top-4 text-neutral-300"
              >
                <Quote size={26} />
              </motion.div>

              {/* Stars */}
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-500 fill-yellow-500"
                    size={20}
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">{item.text}</p>

              <p className="mt-4 text-sm font-semibold text-neutral-800">
                — {item.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
