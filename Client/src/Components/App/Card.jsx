import React from "react";
import { motion } from "motion/react";

export default function CardDemo({ onClick, img }) {
  // Mock data for testing UI
  const recipe = {
    title: "Creamy Pink Sauce Pasta",
    servings: 10,
  };

  const meal = {
    mealName: "Pink Sauce Pasta",
    serving: 10,
    note: "Preferred bit spicy with some sweetness.",
  };

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeIn" }}
      className="w-full max-w-sm bg-white rounded-xl shadow-input p-4 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
    >
      {/* Illustration */}
      <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mb-3">
        <img
          src={img}
          alt="Recipe Illustration"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-neutral-900 truncate">
        {recipe.title}
      </h3>

      {/* Serving Badge with Icon */}
      <div className=" flex justify-end items-center mt-2 ">
        <div className="flex items-center gap-1 bg-neutral-200/30 px-2 py-1 rounded-full text-[12px] font-medium text-neutral-600 shadow-xs ">
          {/* Bowl Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12h18m-9 4a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"
            />
          </svg>

          {recipe.servings} Servings
        </div>
      </div>

     
    </motion.div>
  );
}
