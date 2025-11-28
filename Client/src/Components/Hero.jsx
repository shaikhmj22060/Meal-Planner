import React from "react";
import { motion } from "motion/react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Hero = () => {
  const parent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.2 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Floating for orbit icons
  const randomFloat = () => ({
    initial: { y: 0 },
    animate: {
      y: [
        -10 - Math.random() * 15,
        10 + Math.random() * 15,
        -10 - Math.random() * 15,
      ],
      transition: {
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      },
    },
  });

  return (
    <motion.div
      variants={parent}
      initial="hidden"
      animate="show"
      className="relative h-screen flex items-center justify-center px-6 text-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >

      {/* ⭐ 3D ORBIT WRAPPER (KEPT) */}
      <motion.div
        className="
          absolute w-[540px] h-[540px]
          md:w-[760px] md:h-[760px]
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          pointer-events-none
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* TOP */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/590/590685.png"
          className="w-14 md:w-20 absolute top-0 left-1/2 -translate-x-1/2 opacity-40"
          style={{ transform: "translateZ(-220px)" }}
          {...randomFloat()}
        />

        {/* BOTTOM */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/3041/3041131.png"
          className="w-14 md:w-20 absolute bottom-0 left-1/2 -translate-x-1/2 opacity-40"
          style={{ transform: "translateZ(-240px)" }}
          {...randomFloat()}
        />

        {/* LEFT */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
          className="w-14 md:w-20 absolute left-0 top-1/2 -translate-y-1/2 opacity-40"
          style={{ transform: "translateZ(-260px)" }}
          {...randomFloat()}
        />

        {/* RIGHT */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/590/590696.png"
          className="w-14 md:w-20 absolute right-0 top-1/2 -translate-y-1/2 opacity-40"
          style={{ transform: "translateZ(-240px)" }}
          {...randomFloat()}
        />

        {/* DIAGONALS */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/590/590694.png"
          className="w-10 md:w-14 absolute top-[10%] left-[10%] opacity-30"
          style={{ transform: "translateZ(-280px)" }}
          {...randomFloat()}
        />

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/590/590694.png"
          className="w-10 md:w-14 absolute top-[10%] right-[10%] opacity-30"
          style={{ transform: "translateZ(-280px)" }}
          {...randomFloat()}
        />

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
          className="w-10 md:w-14 absolute bottom-[10%] left-[10%] opacity-30"
          style={{ transform: "translateZ(-280px)" }}
          {...randomFloat()}
        />

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/590/590696.png"
          className="w-10 md:w-14 absolute bottom-[10%] right-[10%] opacity-30"
          style={{ transform: "translateZ(-280px)" }}
          {...randomFloat()}
        />
      </motion.div>

      {/* ⭐ TEXT + BACKLIGHT */}
      <motion.div
        variants={child}
        className="relative z-20 max-w-2xl space-y-4 mx-auto"
      >
        <div
          className="
            absolute inset-0 -z-10 rounded-full pointer-events-none 
            bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_40%,rgba(255,255,255,0)_100%)]
          "
        ></div>

        <motion.h1
          variants={child}
          className="text-3xl md:text-7xl text-neutral-800 uppercase font-bold leading-tight tracking-tight"
        >
          Cook Any{" "}
          <motion.span
            initial={{ opacity: 0, filter: "blur(7px)", y: 20 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", skewX: -2 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="inline-block text-neutral-700"
          >
            Dish
          </motion.span>{" "}
          With Just a Name.
        </motion.h1>

        <motion.h3
          variants={child}
          className="md:text-lg text-neutral-900 text-sm capitalize"
        >
          Describe your dish, and AI writes the full recipe.
        </motion.h3>

        <div className="flex justify-center items-center">
          <Button variants={child} className="capitalize mt-4 font-bold">
          <Link to={'App/Meals/generate'}>  Generate Your First Recipe Now </Link>  
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
