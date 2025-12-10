import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <ToastContainer
        
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        closeOnClick
      />
      <RouterProvider router={router} />
    </AuthProvider>
  </>
);
