import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Outlet, RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <StrictMode>
      <RouterProvider router={router} />
      <Outlet />
    </StrictMode>
    
  </GoogleOAuthProvider>
);
