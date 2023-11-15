import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { env } from "./env";
import { Router } from "./router";
import { Toasts } from "./ui";

import "../css/app.css";
import "./bootstrap";

const queryClient = new QueryClient();

createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={env.VITE_GOOGLE_AUTH_SSO_CLIENT_ID}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>

        {ReactDOM.createPortal(<Toasts />, document.body)}
      </GoogleOAuthProvider>

      {env.VITE_APP_ENV === "local" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </React.StrictMode>,
);
