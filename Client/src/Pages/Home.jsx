import React from "react";
import Nav from "../Components/Nav";
import Hero from "../Components/Hero";
import { motion,useScroll,useTransform } from "motion/react";
const Home = () => {

  const { scrollYProgress } = useScroll();

  // Page 2 should rise and cover page 1
  const page2Y = useTransform(scrollYProgress, [0, 0.33], ["0%", "-100%"]);
  
  // Page 3 should rise and cover page 2
  const page3Y = useTransform(scrollYProgress, [0.33, 0.66], ["100%", "0%"]);
  return (
    <div className="h-full w-full">
      <div className="h-screen  bg-neutral-200/20 bg-[url('red-pepper.webp')] md:bg-[url('cuisine.webp')] bg-cover bg-top md:bg-right  md:bg-contain md:bg-no-repeat ">
        <div class="w-full  h-screen">
          <Nav />
          <Hero />
        </div>
      </div>
      <motion.div className="h-screen bg-neutral-200/20 z-20" style={{ y: page2Y }}>
        <img src="pepper.jpg" alt="" className="h-fit" />
      </motion.div>
    </div>
  );
};

export default Home;
