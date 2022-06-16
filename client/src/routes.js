import React from "react";
import {  Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import LinksPage from "./pages/LinksPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>


    );
  }
  return (
    <>
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
    </>
  );
};
