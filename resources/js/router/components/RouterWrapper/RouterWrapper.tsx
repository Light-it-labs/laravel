import type { PropsWithChildren } from "react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "~/router";
import { useAuthStore } from "~/stores";

type Props = PropsWithChildren & {
  guest?: boolean;
};

export const RouterWrapper = ({ guest = false, children }: Props) => {
  const isAuthenticated = useAuthStore((state) => state.token);

  if (!guest && !isAuthenticated) {
    return <Navigate to='/404' />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>{children}</Route>
    </Routes>
  );
};
