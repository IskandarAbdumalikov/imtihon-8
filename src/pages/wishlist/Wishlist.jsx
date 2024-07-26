import React from "react";
import "./wishlist.scss";
import Products from "../../components/products/Products";
import { useSelector } from "react-redux";
import Join from "../../components/join/Join";
import Empty from "../../components/empty/Empty";

const Wishlist = () => {
  let data = useSelector((state) => state.wishlist.value);
  if (data.length === 0) {
    return (
      <Empty
        url={
          "https://i.pinimg.com/originals/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.png"
        }
        title={"Wishlist"}
      />
    );
  }
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
