import type { PropsWithChildren } from "react";
import React from "react";
import * as Sentry from "@sentry/react";

import { ErrorBoundary } from "~/sections";

export const SentryProvider = ({ children }: PropsWithChildren) => {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorBoundary />}>
      {children}
    </Sentry.ErrorBoundary>
  );
};
