import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/login";
import NonAuth from "./layouts/NonAuth";
import Dashboard from "./layouts/Dashboard";
import HomePage from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <NonAuth />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
