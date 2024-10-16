import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GuestRouter } from "~/domains";
import { NotFound } from "~/sections";

export const Router = () => {
  return (
    <BrowserRouter>
      <GuestRouter />
      <Routes>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
