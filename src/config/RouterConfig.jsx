import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../views/layouts/AuthLayout";
import Home from "../page/Home";
import PageNotFound from "../views/errors/PageNotFound";
import MainLayout from "../views/layouts/MainLayout";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Login from "../views/modules/auth/login";

export default function RouterConfig() {
  return <RouterProvider router={router} />
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/signin", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/", element: <Home /> },


    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> }
    ],
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);
