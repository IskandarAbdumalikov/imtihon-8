import React, { lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Wishlist from "./pages/wishlist/Wishlist";
import Cart from "./pages/cart/Cart";

const Home = lazy(() => import("./pages/home/Home"));
const Layout = lazy(() => import("./components/layout/Layout"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const SinglePage = lazy(() => import("./pages/singlePage/SinglePage"));
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/checkout/Checkout";
import Complete from "./pages/complete/Complete";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products/:productId" element={<SinglePage />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="complete" element={<Complete />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
