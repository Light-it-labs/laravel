import { StrictMode } from "react";
// import * as Sentry from "@sentry/react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";

// import { ErrorBoundaryFallback } from "./screens/ErrorBoundaryFallback";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { z } from "zod";

import { Toasts, useToastStore } from "./components";
import { env } from "./env";
import { Router } from "./router";

import "../css/app.css";
import "./bootstrap";


const errorSchema = z.object({ message: z.string() });

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const isLocal = env.VITE_APP_ENV === "local";

const queryCache = !isLocal
  ? new QueryCache()
  : new QueryCache({
      // here we set a generic error handler on dev mode
      onError: (e, query) => {
        const parsedError = errorSchema.safeParse(e);
        const { pushToast } = useToastStore.getState();

        void pushToast({
          type: "error",
          title: "Error",
          message: `${query.queryKey[0] as string} error: ${
            !parsedError.success
              ? "Whoops! please check the network tab in the dev tools"
              : parsedError.data.message
          }`,
        });
      },
    });

const queryClient = new QueryClient({
  queryCache,
});

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "There's no #root div, something's wrong with our index.html",
  );
}

// Enable this if needed
/* Sentry.init({
  dsn: env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      // See docs for support of different versions of variation of react router
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
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
  tracePropagationTargets: [
    new RegExp(env.VITE_SENTRY_TRACE_PROPAGATION_TARGET_REGEX),
  ],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
}); */

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <Sentry.ErrorBoundary fallback={<ErrorBoundaryFallback />}> */}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {/* </Sentry.ErrorBoundary> */}

      {ReactDOM.createPortal(<Toasts />, document.body)}

      {isLocal && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
