import React, { useState } from "react";
import Button from "./Button";
import { cn } from "../lib/utils";
import { IconHammer, IconMenu2 } from "@tabler/icons-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Modal from "./MenuModal";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const navLInks = [
    {
      id: "#Login",
      tittle: "Login ",
      href: "/login",
    },
    {
      id: "#Signup",
      tittle: "Signup",
      href: "/register",
    },
    {
      id: "#Home",
      tittle: "Home",
      href: "/",
    },
  ];
  const listVariants = {
    open: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.08,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };

  return (
    <>
      <div className="w-full h-screen ">
        <nav className=" w-10/12 px-4 fixed py-2 mt-4 left-1/2 -translate-x-1/2 bg-neutral-200 shadow-input rounded-2xl ">
          <div className="flex justify-between items-center">
            <div>
              <h1 className=" text-2xl text-gray-900 font-semibold">
                Meal-Planner
              </h1>
            </div>
            <div className="text-gray-700 font-semibold">
              <ul className="sm:flex sm:items-center gap-2 hidden">
                {navLInks.map((data) => (
                  <li key={data.id} id={data.id}>
                    <Link to={data.href}>{data.tittle}</Link>
                  </li>
                ))}
              </ul>
              <div>
                <div>
                  <button className="sm:hidden text-xl" onClick={openMenu}>
                    <IconMenu2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="sm:hidden">
          <Modal isOpen={isOpen} closeMenu={closeMenu}>
            <motion.ul
              variants={listVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              className="text-2xl flex flex-col divide-y-2 shadow-xs divide-neutral-400/20 text-gray-700"
            >
              {navLInks.map((data) => (
                <motion.li
                  key={data.id}
                  variants={itemVariants}
                  className="py-4"
                >
                  <Link to={data.href}>{data.tittle}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Nav;
