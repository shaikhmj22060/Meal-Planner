import React, { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

const backdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modalPanel = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};
const closeBtnVariants = {
  initial: { x: "30%", opacity: 0 }, // Start thoda upar + invisible
  animate: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  }, // Smooth neeche aa jaye
  exit: {
    x: "-30%",
    opacity: 0,
    transition: { duration: 0.9, ease: "easeIn" },
  }, // Close hote time fir upar chala jaye
};

const Modal = ({ children, isOpen, closeMenu }) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(isOpen);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {render && (
        <motion.div
          variants={backdrop}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 bg-neutral-200/60 backdrop-blur-sm"
        >
          <motion.div
            variants={modalPanel}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-screen w-full bg-neutral-200 shadow-xl"
          >
            <div className="w-full px-8 py-6 shadow-input flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Menu</h1>
              <motion.button
                variants={closeBtnVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-neutral-300/80 px-3 py-1.5 rounded-xl"
                onClick={closeMenu}
              >
                <IconX className="text-gray-700" />
              </motion.button>
            </div>

            <div className="px-8 py-8 h-full bg-neutral-300/35">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
