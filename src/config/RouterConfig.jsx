import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../views/layouts/AuthLayout";
import Home from "../page/Home";

export default function () {
  return <RouterProvider router={router} />
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/", element: <Home /> }],
  }
]);
