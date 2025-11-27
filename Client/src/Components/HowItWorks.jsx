import { motion } from "framer-motion";
import { Search, Sparkles, CookingPot } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const stepVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function HowItWorks() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          How It Works
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 mt-4 text-lg"
        >
          Generate chef-level recipes in seconds with the power of AI.
        </motion.p>

        {/* Horizontal Animated Line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          transition={{ duration: 1 }}
          className="h-0.5 bg-gray-300 mx-auto my-12 rounded-full"
        />

        {/* STEPS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1  md:grid-cols-3 gap-12 mt-10"
        >
          {/* STEP 1 */}
          <motion.div
            variants={stepVariant}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="flex flex-col items-center p-6 rounded-xl  bg-white hover:shadow-md duration-200 shadow-input"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-blue-600" strokeWidth={2.2} />
            </div>

            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              Enter Your Dish
            </h3>
            <p className="text-gray-500 mt-2 leading-relaxed">
              Type any dish you want — biryani, pasta, salad, anything.
            </p>
          </motion.div>

          {/* STEP 2 */}
          <motion.div
            variants={stepVariant}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="flex flex-col items-center p-6 rounded-xl shadow-input bg-white  hover:shadow-md duration-200"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-600" strokeWidth={2.3} />
            </div>

            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              AI Generates Recipe
            </h3>
            <p className="text-gray-500 mt-2 leading-relaxed">
              Instantly get ingredients, steps, tips & cooking time.
            </p>
          </motion.div>

          {/* STEP 3 */}
          <motion.div
            variants={stepVariant}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="flex flex-col items-center p-6 rounded-xl shadow-input bg-white  hover:shadow-md duration-200"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <CookingPot
                className="w-8 h-8 text-green-600"
                strokeWidth={2.2}
              />
            </div>

            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              Start Cooking
            </h3>
            <p className="text-gray-500 mt-2 leading-relaxed">
              Follow your personalized recipe & enjoy delicious results.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
