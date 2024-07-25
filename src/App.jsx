import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Wishlist from "./pages/wishlist/Wishlist";
const Home = lazy(() => import("./pages/home/Home"));
const Layout = lazy(() => import("./components/layout/Layout"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const SinglePage = lazy(() => import("./pages/singlePage/SinglePage"));

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="products/:productId" element={<SinglePage />} />
      </Route>
    </Routes>
  );
};

export default App;
