import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../views/layouts/AuthLayout";
import Login from "../views/modules/auth/login";
import Registration from "../views/modules/auth/register"
import ForgotPassword from "../views/modules/auth/forgotPassword";
import MainLayout from "../views/layouts/MainLayout";
import Home from "../page/Home";
import PageNotFound from "../views/errors/PageNotFound";
import OTPVerification from "../views/modules/auth/OTPVerification";
import ResetPassword from "../views/modules/auth/resetPassword";

export default function RouterConfig() {
  return <RouterProvider router={router} />;
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/signin", element: <Login /> },
      { path: "/signup", element: <Registration /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/verify-otp", element: <OTPVerification /> },
      { path: "/reset-password", element: <ResetPassword /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);