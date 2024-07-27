import React, { lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Wishlist from "./pages/wishlist/Wishlist";
import Cart from "./pages/cart/Cart";

const Home = lazy(() => import("./pages/home/Home"));
const Layout = lazy(() => import("./components/layout/Layout"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const SinglePage = lazy(() => import("./pages/singlePage/SinglePage"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Complete = lazy(() => import("./pages/complete/Complete"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const ProductCreate = lazy(() =>
  import("./pages/productCreate/ProductsCreate")
);
const ProductManage = lazy(() => import("./pages/productManage/ProductManage"));
const CategoryCreate = lazy(() =>
  import("./pages/categoryCreate/CategoryCreate")
);
const CategoryManage = lazy(() =>
  import("./pages/categoryManage/CategoryManage")
);
const Login = lazy(() => import("./pages/login/Login"));

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="shop" element={<Shop />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/productCreate" element={<ProductCreate />} />
          <Route path="/admin/productManage" element={<ProductManage />} />
          <Route path="/admin/categoryCreate" element={<CategoryCreate />} />
          <Route path="/admin/categoryManage" element={<CategoryManage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
