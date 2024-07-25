import React from "react";
import "./wishlist.scss";
import Products from "../../components/products/Products";
import { useSelector } from "react-redux";
import Join from "../../components/join/Join";

const Wishlist = () => {
  let data = useSelector((state) => state.wishlist.value);
  return (
    <div className="wishlist">
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Wishlist</h2>
        <Products data={data} />
      </div>
      <Join />
    </div>
  );
};

export default Wishlist;
