import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";


createRoot(document.getElementById("root")).render(
  <AuthContext>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </AuthContext>
);
