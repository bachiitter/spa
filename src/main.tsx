import "@fontsource/inter";
import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { Router, RouterProvider } from "@tanstack/router";

import { appRoute } from "./pages/_app";
import { IndexRoute } from "./pages/index";

const routeTree = appRoute.addChildren([IndexRoute]);

const router = new Router({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
