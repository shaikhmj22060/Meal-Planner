import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "motion/react";
import {
  Home,
  Wand2,
  Bookmark,
  User,
  PanelRight,
  ChefHat,
  Sparkle,
} from "lucide-react";

export default function Sidebar() {
  const sidebarVariants = {
    hidden: {
      x: -100,
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      filter: "blur(8px)",
    },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.aside
      className="md:w-[20%] hidden md:px-4 md:py-3 md:flex md:flex-col bg-neutral-100/40 shadow-input h-screen "
      variants={sidebarVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <Link to={"/"}>
          <ChefHat size={22} className="cursor-pointer" />
        </Link>
        <PanelRight size={20} className="cursor-pointer" />
      </motion.div>

      <motion.div className="mt-10 cursor-pointer" variants={itemVariants}>
        <SideLinks
          to={"/App/Meals/generate"}
          icon={<Wand2 size={20} />}
          text={"New Recipe"}
        />
      </motion.div>
    </motion.aside>
  );
}

export function SideLinks({ icon, text, to }) {
  return (
    <Link to={to}>
      <motion.div
        className="flex items-center hover:shadow-2xs transition-all ease-in-out duration-300 gap-3 hover:bg-neutral-200/50 py-3 px-3 rounded-xl"
        whileHover={{ backgroundColor: "rgba(229, 229, 229, 0.5)" }}
        whileTap={{ scale: 0.7 }}
      >
        {icon}
        <h1>{text}</h1>
      </motion.div>
    </Link>
  );
}
