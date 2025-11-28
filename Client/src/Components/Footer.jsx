import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-300 py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-semibold text-white">Meal Planner AI</h2>
          <p className="mt-3 text-sm text-neutral-400">
            Your smart assistant for generating personalized recipes, meal
            ideas, and cooking instructions powered by AI.
          </p>
        </div>

        {/* Quick Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <a href="/" className="hover:text-white duration-200">
                Home
              </a>
            </li>
            <li>
              <a
                href="App/Meals/generate"
                className="hover:text-white duration-200"
              >
                Generate Recipe
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white duration-200">
                Saved Meals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white duration-200">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Feedback / Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Give Us Your Feedback
          </h3>
          <p className="text-sm text-neutral-400 mb-4">
            Help us improve the platform. Share your thoughts or report issues.
          </p>

          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 bg-neutral-800 text-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 shadow-input"
            />
            <textarea
              rows="3"
              placeholder="Your Feedback"
              className="w-full px-4 py-2 bg-neutral-800 text-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 shadow-input"
            />
            <button
              type="submit"
              className="w-full bg-white text-neutral-900 font-semibold py-2 rounded-lg hover:bg-neutral-200 duration-200 shadow-input"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-neutral-700 mt-10 pt-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Meal Planner AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
