import type { PropsWithChildren } from "react";
import React from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { z } from "zod";

import { isLocal } from "~/config";

const errorSchema = z.object({ message: z.string() });

const queryCache = !isLocal
  ? new QueryCache()
  : new QueryCache({
      // here we set a generic error handler on dev mode
      onError: (e, query) => {
        const parsedError = errorSchema.safeParse(e);
        console.log({
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

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isLocal && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
