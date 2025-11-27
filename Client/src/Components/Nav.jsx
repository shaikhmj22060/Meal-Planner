import React, { useState } from "react";
import Button from "./Button";
import { cn } from "../lib/utils";
import {
  IconLogin,
  IconLogout,
  IconMenu2,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./MenuModal";
import { useAuth } from "../context/AuthContext";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const logOut = async () => {
    const res = await logout();
    if (res.success) {
      navigate("/login");
    }
  };
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const navLinks = [
    {
      id: "#Signup",
      title: "Signup",
      href: "/register",
      requireAuth: false,
    },
    {
      id: "#Login",
      title: "Login",
      href: "/login",
      requireAuth: false,
      icon: <IconLogin className="size-5" />,
      className:
        "px-2 py-2 active:scale-1 hover:bg-black/70  transition-all duration-300 rounded-xl bg-black/80 shadow-input text-sm  justify-center text-white flex items-center gap-1",
    },
    {
      id: "#Meals",
      title: "My Recipe",
      href: "/App/Meals",
      requireAuth: true,
    },
    {
      id: "#Logout",
      title: "Log out",
      href: "#Logout",
      requireAuth: true,
      icon: <IconLogout className="size-5" />,
      className:
        "px-2 py-2 active:scale-1 hover:bg-black/70  transition-all duration-300 rounded-xl bg-black/80 shadow-input text-sm  justify-center text-white flex items-center gap-1",
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
      <div className="w-full h-1/11 ">
        <motion.nav
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{duration:0.6 ,ease:"easeIn"}}
          className=" w-10/12 z-30 px-4 md:px-2 fixed py-2 mt-4 left-1/2 -translate-x-1/2 bg-neutral-200/50 shadow-input rounded-2xl "
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className=" text-2xl text-gray-900 font-semibold">
                Meal-Planner
              </h1>
            </div>
            <div className="text-gray-700 font-semibold">
              <ul className="sm:flex sm:items-center gap-2 hidden">
                {navLinks.map((data) => {
                  if (isAuthenticated == true) {
                    // When user IS logged in → hide Login & Signup
                    if (data.id === "#Login" || data.id === "#Signup")
                      return null;
                  } else {
                    // When user is NOT logged in → hide Logout & Home
                    if (data.id === "#Logout" || data.id === "#Meals")
                      return null;
                  }
                  const handleClick = (e) => {
                    if (data.id === "#Logout") {
                      e.preventDefault();
                      logOut();
                    }
                  };

                  return (
                    <li key={data.id} id={data.id}>
                      <Link
                        to={data.href}
                        className={data.className}
                        onClick={handleClick}
                      >
                        {data.icon}
                        {data.title}
                      </Link>
                    </li>
                  );
                })}
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
        </motion.nav>
        <div className="sm:hidden">
          <Modal isOpen={isOpen} closeMenu={closeMenu}>
            <motion.ul
              variants={listVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              className="text-2xl flex flex-col divide-y-2 shadow-xs divide-neutral-400/20 text-gray-700"
            >
              {navLinks.map((data) => {
                if (isAuthenticated) {
                  // When user IS logged in → hide Login & Signup
                  if (data.id === "#Login" || data.id === "#Signup")
                    return null;
                } else {
                  // When user is NOT logged in → hide Logout & Home
                  if (data.id === "#Logout" || data.id === "#Meals")
                    return null;
                }
                const handleClick = (e) => {
                  if (data.id === "#Logout") {
                    e.preventDefault();
                    logout();
                  }
                };
                return (
                  <motion.li
                    key={data.id}
                    variants={itemVariants}
                    className="py-4"
                  >
                    <Link
                      to={data.href}
                      className={data.className}
                      onClick={handleClick}
                    >
                      {data.title}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Nav;
