import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Protected from "./context/Protected";
import Logout from "./Components/Logout";
import MyRecipe from "./Pages/MyRecipe";
import Generate from "./Components/App/Generate";
import Register from "./Pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/App/Meals",
    element: [
      <Protected>
        <MyRecipe />
      </Protected>,
    ],
    children: [
      {
        path: "generate",
        element: <Generate />,
      },
    ],
  },
]);
