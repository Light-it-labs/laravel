import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { env } from "./env";
import { Router } from "./router";
import { Toasts } from "./ui";

import "../css/app.css";
import "./bootstrap";

const queryClient = new QueryClient();

Sentry.init({
  dsn: env.VITE_SENTRY_DSN_PUBLIC,
  integrations: [
    new Sentry.BrowserTracing({
      // See docs for support of different versions of variation of react router
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
    new Sentry.Replay(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

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
