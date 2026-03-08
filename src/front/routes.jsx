import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./pages/layout";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Private } from "./pages/private";
import { Home } from "./pages/home";

import { PrivateRoute } from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [

      { index: true, element: <Home /> },

      { path: "/signup", element: <Signup /> },

      { path: "/login", element: <Login /> },

      {
        path: "/private",
        element:
          <PrivateRoute>
            <Private />
          </PrivateRoute>
      }

    ]
  }
]);