import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import { Login } from "./Pages/Auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
