import React from "react";
import { Route } from "react-router-dom";

import { RouterWrapper, ROUTES } from "~/router";
import { Home, Login } from "./screens";

export const GuestRouter = () => {
  return (
    <RouterWrapper guest>
      <Route element={<Home />} path={ROUTES.home} />
      <Route element={<Login />} path={ROUTES.login} />
    </RouterWrapper>
  );
};
