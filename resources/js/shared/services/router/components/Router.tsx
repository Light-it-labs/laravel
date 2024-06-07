import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";

import { LeftNavbarLayout } from "@/app/layouts";
import { NotFound } from "@/app/NotFound";
import { Home, Login, Users } from "@/app/screens";
import { ROUTES } from "../config/routes";
import { ModalRouter } from "./ModalRouter";
import { ProtectedRoute } from "./ProtectedRoute";

export const Router = () => {
  const location = useLocation();
  const { previousLocation } = (location.state ?? {}) as {
    previousLocation?: Location;
  };

  return (
    <>
      {/* PUBLIC ONLY ROUTES */}
      <Routes location={previousLocation ?? location}>
        <Route element={<ProtectedRoute expected="loggedOut" />}>
          <Route element={<Login />} path={ROUTES.login} />
        </Route>

        {/* PRIVATE ONLY ROUTES */}
        <Route element={<ProtectedRoute expected={["admin", "standard"]} />}>
          <Route element={<LeftNavbarLayout />}>
            <Route element={<Navigate to={ROUTES.home} />} path={ROUTES.base} />

            <Route element={<Home />} path={ROUTES.home} />

            <Route path={ROUTES.notFound} element={<NotFound />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute expected="admin" />}>
          <Route element={<LeftNavbarLayout />}>
            <Route element={<Users />} path={ROUTES.users} />
          </Route>
        </Route>
      </Routes>

      {/* MODALS ROUTES */}
      <Routes>
        <Route
          path="*"
          element={<ModalRouter showModal={!!previousLocation} />}
        />
      </Routes>
    </>
  );
};
