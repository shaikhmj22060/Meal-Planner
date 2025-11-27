import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "../Button";
import Card from "./Card";
import generate from "./Api/Generate";
import { useAuth } from "../../context/AuthContext";

export default function Generate() {
  const [open, setOpen] = useState(false);
  const [dish, setDish] = useState("");
  const [serving, setServing] = useState("");
  const [notes, setNotes] = useState("");
  const [Loading, setLoading] = useState(false);
  
  const { isAuthenticated } = useAuth();
 
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isAuthenticated == true) {
      const result = await generate(dish, serving, notes);
      setLoading(false);
      setOpen(false);
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
  if (Loading) {
    return <div className="z-999">Generating</div>;
  }
  return (
    <motion.div
      className="relative w-full h-screen p-4 flex flex-col "
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
          alt="Pencil Illustration"
          className="w-full h-full object-contain opacity-90"
        />
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        <Card img={"/dish.svg"} />
        <Card img={"/dish2.svg"} />
        
      </div>

      {/* Floating Button */}
      <motion.button
        variants={itemVariants}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-neutral-800 text-white w-14 h-14 rounded-full 
            flex cursor-pointer items-center justify-center shadow-lg text-3xl hover:bg-neutral-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        +
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md shadow-input bg-black/30 flex items-center justify-center z-50"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4">Create New Recipe</h3>

              {/* Dish Name */}
              <label className="block text-sm font-medium mb-1">
                Dish Name
              </label>
              <input
                type="text"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                className="w-full outline-neutral-200 rounded-lg p-2 mb-4 shadow-input"
                placeholder="Enter dish name"
              />

              {/* Serving */}
              <label className="block text-sm font-medium mb-1">Serving</label>
              <input
                type="number"
                value={serving}
                onChange={(e) => setServing(e.target.value)}
                className="w-full outline-neutral-200 rounded-lg p-2 mb-4 shadow-input"
                placeholder="Number of servings"
              />

              {/* Notes */}
              <label className="block text-sm font-medium mb-1">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full outline-neutral-200 rounded-lg p-2 h-24 mb-4 shadow-input"
                placeholder="Write notes..."
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-neutral-200/60 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <Button onClick={onSubmit} className={"px-4 font-semibold"}>
                  Generate
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
