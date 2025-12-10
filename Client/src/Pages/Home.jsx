import React from "react";
import Nav from "../Components/Nav";
import Hero from "../Components/Hero";
import { motion, useScroll, useTransform } from "motion/react";
import HowItWorks from "../Components/HowItWorks";
import SparkleBackground from "../Components/SparkleBackground";
import TestimonialsSection from "../Components/TestimonialsSection";
import { useAuth } from "../context/AuthContext";
import Footer from "../Components/Footer";

const Home = () => {
  const { scrollYProgress } = useScroll();

  const navY = useTransform(scrollYProgress, [0, 0.1], ["0%", "-100%"]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const { User } = useAuth();
  console.log(User?.name);
  // PAGE PARALLAX
  const page2Y = useTransform(scrollYProgress, [0, 0.15], ["100%", "0%"]);
  const page3Y = useTransform(scrollYProgress, [0.15, 0.66], ["100%", "0%"]);

  return (
    <div className="h-full w-full relative overflow-hidden ">
      <SparkleBackground count={60} />
      {/* PAGE 1 */}
      <div className="h-screen relative">
        <motion.div
          style={{ y: navY, opacity: navOpacity }}
          className="w-full fixed top-0 left-0 z-999"
        >
          <Nav />
        </motion.div>
        <div className="w-full h-screen">
          <Hero />
        </div>
      </div>

      {/* PAGE 2 */}
      <motion.div
        className="h-screen relative z-20 flex  items-center justify-center"
        style={{ y: page2Y }}
      >
        <HowItWorks />
        <SparkleBackground />
      </motion.div>
      <motion.div
        className="h-screen relative z-20 flex  items-center justify-center"
        style={{ y: page3Y }}
      >
        <TestimonialsSection />
      </motion.div>

      {/* PAGE 3 */}
      <motion.div className=" bg-neutral-200/20 z-30 flex items-center  justify-center">
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
