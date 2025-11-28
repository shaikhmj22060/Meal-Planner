import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "../Button";
import { generate, fetchMeals } from "./Api/Generate";
import { useAuth } from "../../context/AuthContext";
import CardDemo from "./Card";

export default function Generate() {
  const [open, setOpen] = useState(false);
  const [dish, setDish] = useState("");
  const [serving, setServing] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false); // ✅ lowercase
  const [meal, setMeal] = useState(null); // ✅ lowercase
  const [error, setError] = useState(null); // ✅ Add error state
  const { isAuthenticated } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Please login to generate recipes");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("🍳 Generating recipe for:", dish); // Debug
      const result = await generate(dish, serving, notes);
      console.log("✅ Recipe generated:", result); // Debug

      // setMeal(result);
      setOpen(false); // ✅ Close modal after successful generation

      // Reset form
      setDish("");
      setServing("");
      setNotes("");
    } catch (err) {
      console.error("❌ Generation error:", err);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 80 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: 80, transition: { duration: 0.25, ease: "easeIn" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  useEffect(() => {
    const loadMeals = async () => {
      const data = await fetchMeals();
      setMeal(data);
    };
    loadMeals();
  }, []);

  return (
    <motion.div
      className="relative w-full h-screen p-4 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Illustration Section */}
      <motion.div
        variants={itemVariants}
        className="w-full h-[45vh] bg-gray-200 rounded-xl mb-4 flex items-center justify-center"
      >
        <img
          src="https://imgs.search.brave.com/cbK02ZtlH68iHg0WjpVo9S7_Tmz6N502BlUBGvM5a-o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvcGVyc29u/LWluLWFwcm9uLWNv/b2tpbmctaW4tYS1w/b3Qtb24tYS1kaWdp/dGFsLXNjcmVlbi1p/bGx1c3RyYXRpb24t/c3ZnLWRvd25sb2Fk/LXBuZy0xMzAwMDE4/Ni5wbmc"
          alt="Cooking Illustration"
          className="w-full h-full object-contain opacity-90"
        />
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {/* ✅ Show loading indicator here instead of replacing entire component */}
        {loading && (
          <div className="col-span-full flex items-center justify-center py-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
              <p className="text-neutral-600">Generating your recipe...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="col-span-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {meal && meal.length > 0 ? (
          meal.meal.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardDemo
                img="/dish2.svg"
                tittle={item.mealName}
                servings={item.serving}
                note={item.note}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-neutral-500 col-span-full text-center">
            No meals found. Generate one to get started.
          </p>
        )}

        {!meal && !loading && (
          <div className="col-span-full flex items-center justify-center py-12 text-neutral-400">
            <p>Click the + button to generate your first recipe!</p>
          </div>
        )}
      </div>

      {/* Floating Button */}
      <motion.button
        variants={itemVariants}
        onClick={() => setOpen(true)}
        disabled={loading} // ✅ Disable while loading
        className="fixed bottom-6 right-6 bg-neutral-800 text-white w-14 h-14 rounded-full 
            flex cursor-pointer items-center justify-center shadow-lg text-3xl hover:bg-neutral-700
            disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: loading ? 1 : 1.1 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
      >
        +
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md shadow-input bg-black/30 flex items-center justify-center z-50"
            onClick={() => setOpen(false)} // ✅ Close on backdrop click
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl"
              onClick={(e) => e.stopPropagation()} // ✅ Prevent closing when clicking inside
            >
              <h3 className="text-xl font-semibold mb-4">Create New Recipe</h3>

              <form onSubmit={onSubmit}>
                {" "}
                {/* ✅ Wrap in form for better UX */}
                {/* Dish Name */}
                <label className="block text-sm font-medium mb-1">
                  Dish Name
                </label>
                <input
                  type="text"
                  value={dish}
                  onChange={(e) => setDish(e.target.value)}
                  className="w-full outline-neutral-200 rounded-lg p-2 mb-4 shadow-input border border-neutral-200"
                  placeholder="Enter dish name"
                  required // ✅ Add validation
                />
                {/* Serving */}
                <label className="block text-sm font-medium mb-1">
                  Serving
                </label>
                <input
                  type="number"
                  value={serving}
                  onChange={(e) => setServing(e.target.value)}
                  className="w-full outline-neutral-200 rounded-lg p-2 mb-4 shadow-input border border-neutral-200"
                  placeholder="Number of servings"
                  min="1"
                  required // ✅ Add validation
                />
                {/* Notes */}
                <label className="block text-sm font-medium mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full outline-neutral-200 rounded-lg p-2 h-24 mb-4 shadow-input border border-neutral-200"
                  placeholder="Write notes..."
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-neutral-200/60 rounded-lg hover:bg-gray-300"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    className="px-4 font-semibold"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
